import { useCallback, useEffect, useState } from "react";
import React from "react";
import Head from "next/head";
import slugify from "slugify";
import { BsCart4 } from "react-icons/bs";

import axiosClient from "@/libraries/axiosClient";
import ProductContent from "@/components/ProductContent";
import styles from "../styles/thuc-don.module.css";
import ModalCart from "@/components/ModalCart";
import IsLoading from "@/components/IsLoading";

function ProductList(props) {
  const { products, categoryName } = props;

  const [open, setOpen] = useState(false);

  const [cart, setCart] = useState({});

  const getCart = useCallback(async () => {
    try {
      const res = await axiosClient.get("/carts");
      setCart(res.data?.payload || {});
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleGetCart = () => {
    setOpen(!open);
  };

  // const getCartCheckToken = withTokenCheckFunction(getCart);

  useEffect(() => {
    // Gọi hàm getCart trong phạm vi của function component
    getCart();
  }, [getCart]);

  return (
    <>
      <Head>
        <title>{categoryName}</title>
        <meta name="description" content={`Jollibee ${categoryName}`} />
        <meta name="viewport" content={`Jollibee ${categoryName}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          backgroundImage:
            "url('https://jollibee.com.vn/static/version1699974795/frontend/Jollibee/default/vi_VN/images/bg-top.png'), url('https://jollibee.com.vn/static/version1699974795/frontend/Jollibee/default/vi_VN/images/bg-bottom.png')",
          width: "100%",
          maxWidth: "100%",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center calc(100% - 80px)",
          backgroundSize: "100% auto, 100% auto",
          position: "relative",
        }}
      >
        {products && products.length > 0 ? (
          <div className={`container mx-auto px-4 md:px-6 lg:px-8 `}>
            <div className={`${styles.product_wrapper} py-4 md:py-6 lg:py-8`}>
              <ul
                className={`${styles.product_list} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
              >
                {products.length === 0 ? (
                  <IsLoading />
                ) : (
                  products.map((item, index) => (
                    <ProductContent
                      key={item._id}
                      products={item}
                      getCart={getCart}
                      index={index}
                    />
                  ))
                )}
              </ul>
            </div>
            <div className={`${styles.minicart_wrapper} flex justify-end`}>
              <div
                className={`${styles.minicart_content_trigger} fixed bottom-0 flex justify-center w-1/4 md:w-1/4 lg:w-1/5 py-2 px-3 bg-yellow-400 rounded-t-2xl`}
              >
                <button
                  className={styles.minicart_icon}
                  onClick={handleGetCart}
                >
                  <BsCart4 size="3rem" />
                </button>
                <span
                  className={`${styles.subtotal} flex justify-center items-start w-6 text-2xl`}
                >
                  {cart && cart.products && cart.products.length > 0 && (
                    <span
                      className={`${styles.productLength} w-full h-1/2 flex justify-center items-center rounded-full bg-red-700 text-white`}
                    >
                      {cart.products.length}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <ModalCart
              open={open}
              setOpen={setOpen}
              products={products}
              cart={cart}
              setCart={setCart}
              getCart={getCart}
            />
          </div>
        ) : (
          <>
            <div
              className={`container mx-auto flex justify-center items-center px-4 md:px-6 lg:px-8 `}
            >
              <IsLoading />
            </div>
          </>
        )}
      </div>
    </>
  );
}

ProductList.defaultProps = {
  post: {},
};

export default ProductList;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    //Lấy params.path để lấy được path dynamic được định nghĩa
    const { params } = req;

    const categoriesResponse = await axiosClient.get("/categories/all");
    const categories = categoriesResponse.data?.payload || [];

    const convertToEnglishAndSlug = (name) => {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[^A-Za-z0-9-\s]+/g,
        replacement: "-",
      });

      return slug;
    };

    //Thêm path cho mỗi category được covert slug
    const categoriesConvert = categories?.map((item) => ({
      ...item,
      path: `${convertToEnglishAndSlug(item.name)}`,
    }));

    //Trả về category đã được có matching với path
    const matchedCategory = categoriesConvert.filter(
      (category) => category.path === params.path
    );

    const categoryId =
      matchedCategory.length > 0 ? matchedCategory[0].id : null;

    const productsResponse = await axiosClient.get(
      `/filters/product?page=1&pageSize=1000&categoryId=${categoryId}`
    );

    const products = productsResponse.data.payload;

    return {
      props: {
        products: products,
        categoryName: matchedCategory[0].name,
      },

      revalidate: 60 * 60 * 24 * 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
