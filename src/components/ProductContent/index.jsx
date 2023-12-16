import React from "react";
import { useState } from "react";

import styles from "./ProductContent.module.css";
import Image from "next/image";
import ModalAddToCart from "./modalAddToCart";
import numeral from "numeral";
import "numeral/locales/vi";
numeral.locale("vi");
import IsLoading from "@/components/IsLoading";

function ProductContent({ products, getCart, index }) {
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    setOpen(!open);
  };

  return (
    <>
      <li
        className={`${styles.product_item} p-4 border border-dashed border-yellow-500`}
      >
        <div className={`${styles.product_item_info} flex flex-col gap-y-6`}>
          <div className="flex justify-center items-center">
            <div className={`${styles.product_image_wrapper} w-3/4 h-auto`}>
              {products && products.media.coverImageUrl ? (
                <Image
                  width={200}
                  height={200}
                  src={products.media.coverImageUrl}
                  className="w-full"
                  alt="Gà Jollibee thơm ngon"
                />
              ) : (
                <IsLoading/>
              )}
            </div>
          </div>
          <div
            className={`${styles.product_item_details} flex flex-col gap-y-4 items-center font-lg font-bold font-sans text-center`}
          >
            <strong
              className={`${styles.product_item_name} h-12 flex items-center`}
            >
              {products.name}
            </strong>
            <div
              className={`${styles.price_final_price} text-2xl text-red-700 flex flex-col items-center justify-center h-20 w-full`}
            >
              <span>{`${numeral(products.price).format("0,05$")}`}</span>
              {products.discount !== 0 && products.discount ? (
                <div>
                  <span className={`text-yellow-500`}>
                    Giảm: {products.discount} %
                  </span>
                </div>
              ) : null}
            </div>
            <div className={`${styles.product_item_actions} w-2/4 h-auto`}>
              <button
                type="submit"
                title="Đặt hàng"
                className="action_tocart bg-red-700 hover:bg-red-800 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 w-full text-xl"
                onClick={handleAddToCart}
              >
                <span>Đặt hàng</span>
              </button>
            </div>
          </div>
        </div>
      </li>
      <ModalAddToCart
        open={open}
        setOpen={setOpen}
        products={products}
        getCart={getCart}
      />
    </>
  );
}

export default ProductContent;
