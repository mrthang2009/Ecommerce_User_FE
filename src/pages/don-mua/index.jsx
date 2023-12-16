import axiosClient from "@/libraries/axiosClient";
import React, { useCallback, useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import "numeral/locales/vi";
import Head from "next/head";
import IsLoading from "@/components/IsLoading";
import IsLoadingSmall from "@/components/IsLoadingSmall";
import { toast } from "react-toastify";

numeral.locale("vi");

function PurchaseOrder() {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState({
    delete: false,
  });

  const [isLoadingOrderId, setIsLoadingOrderId] = useState(null);

  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    page: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const statusMapping = {
    PLACED: "Đã đặt hàng",
    PREPARED: "Chuẩn bị xong",
    DELIVERING: "Đang vận chuyển",
    COMPLETED: "Hoàn thành",
    CANCELED: "Cửa hàng hủy",
    REJECTED: "Hủy đơn",
    FLAKER: "Boom hàng",
  };

  const cancelButtonRef = useRef(null);

  const getOrderMe = useCallback(async () => {
    try {
      console.log('««««« pagination »»»»»', pagination);
      const response = await axiosClient.get(
        `/orders?page=${pagination.page}&pageSize=${pagination.pageSize}`
      );
      setOrders(response.data?.payload || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data?.total || 0,
        count: response.data?.count || 0,
      }));
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, [pagination.page, pagination.pageSize]);

  const onChangePrevious = () => {
    setPagination((prev) => ({
      ...prev,
      page: pagination.page - 1,
    }));
  };

  const onChangeNext = () => {
    if (pagination.page < Math.ceil(pagination.total / pagination.pageSize)) {
      setPagination((prev) => ({
        ...prev,
        page: pagination.page + 1,
      }));
    }
  };

  const handleChangeStatus = (order) => {
    setOrderDetail(order);
    setOpen(!open);
  };

  const handleCancelOrderDetail = useCallback(async(order) => {
    const shouldCancel = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này?"
    );
    if (shouldCancel) {
      try {
        setIsLoadingOrderId(order._id);
        setButtonDisabled((prev) => ({
          ...prev,
          delete: true,
        }));
        await axiosClient.patch(`/orders/status/${order._id}?status=REJECTED`);
        await getOrderMe();
        toast.success("Hủy đơn hàng thành công");
        setButtonDisabled((prev) => ({
          ...prev,
          delete: false,
        }));
      } catch (error) {
        console.error(error);
        toast.error("Hủy đơn hàng thất bại");
        setButtonDisabled((prev) => ({
          ...prev,
          delete: true,
        }));
      }
    }
  }, [getOrderMe]);

  useEffect(() => {
    getOrderMe();
  }, [getOrderMe]);

  return (
    <>
      <Head>
        <title>Thông tin đơn hàng</title>
        <meta name="description" content="Thông tin đơn hàng Jollibee" />
        <meta name="viewport" content="Thông tin đơn hàng Jollibee" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className={`p-4 md:p-6 lg:p-6 text-base md:text-xl lg:text-2xl`}
        style={{
          backgroundImage:
            "url('https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/Levinci_Widget/images/jollibee-kid-party-bg.png')",
          backgroundSize: "cover",
        }}
      >
        <h3 className="font-bold text-center p-6 text-4xl">Đơn hàng của tôi</h3>
        <div className="overflow-x-auto text-center">
          {orders && orders.length > 0 ? (
            <table className=" min-w-full border-2 border-gray-300">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                    Stt
                  </th>
                  <th className="border-b-2 border-gray-300 p-2">
                    Mã đơn hàng
                  </th>
                  <th className="border-b-2 border-gray-300 p-2">Trạng thái</th>
                  <th className="border-b-2 border-gray-300 p-2">
                    Hủy đơn hàng
                  </th>
                  <th className="border-b-2 border-gray-300 p-2 hidden md:hidden lg:table-cell">
                    Hình thức mua hàng
                  </th>
                  <th className="border-b-2 border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                    Ngày tạo đơn
                  </th>
                  <th className="border-b-2 border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                    Ngày dự kiến giao hàng
                  </th>
                  <th className="border-b-2 border-gray-300 p-2">Thanh toán</th>
                  {/* Thêm tiêu đề cho các cột khác của đơn hàng */}
                </tr>
              </thead>
              {orders && (
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td className="border-b border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                        <span>
                          {index +
                            1 +
                            pagination.pageSize * (pagination.page - 1)}
                        </span>
                      </td>
                      <td className="border-b border-gray-300 p-2">
                        <Link href="" onClick={() => handleChangeStatus(order)}>
                          {order._id}
                        </Link>
                      </td>
                      
                      <td className="border-b border-gray-300 p-2">
                        <span
                          className={`inline-block px-2 py-1 w-full rounded text-white ${
                            order.status === "PLACED"
                              ? "bg-blue-500"
                              : order.status === "COMPLETED"
                              ? "bg-green-500"
                              : order.status === "DELIVERING"
                              ? "bg-orange-500"
                              : order.status === "PREPARED"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {statusMapping[order.status]}
                        </span>
                      </td>

                      <td className="border-b border-gray-300 p-2 ">
                        {order.status === "PLACED" ||
                        order.status === "PREPARING" ? (
                          <button
                            className="flex-col justify-center hover:bg-gray-400 rounded-md"
                            onClick={() => handleCancelOrderDetail(order)}
                            disabled = {isButtonDisabled.delete}
                          >
                            {
                              isButtonDisabled.delete && isLoadingOrderId === order._id ?(
                                <div
                                className={`flex justify-center items-center`}
                              >
                                <IsLoadingSmall />
                              </div>
                              ) : (
                                <CiTrash size={"20px"} />
                              )
                            }
                          </button>
                        ) : null}
                      </td>
                      <td className="border-b border-gray-300 p-2 hidden md:hidden lg:table-cell">
                        <td className="border-gray-300 p-2 flex justify-center">
                          {order.isOnline && order.isOnline === true ? (
                            <span>Trực tuyến</span>
                          ) : (
                            <span>Mua tại cửa hàng</span>
                          )}
                        </td>
                      </td>

                      <td className="border-b border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                        <span>{`${new Date(
                          order.createdDate
                        ).toLocaleDateString()}`}</span>
                      </td>
                      {order.status === "COMPLETED" ? (
                        <td className="border-b border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                          <span>{`${new Date(
                            order.updatedAt
                          ).toLocaleDateString()}`}</span>
                        </td>
                      ) : order.status === "REJECTED" ||
                        order.status === "FLAKER" ? (
                        <td className="border-b border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                          _____
                        </td>
                      ) : (
                        <td className="border-b border-gray-300 p-2 hidden md:table-cell lg:table-cell">
                          <span>{`${new Date(
                            order.shippedDate
                          ).toLocaleDateString()}`}</span>
                        </td>
                      )}

                      <td className="border-b border-gray-300 px-4 py-2">
                        <span className="flex justify-end">{`${numeral(
                          order.productList.reduce(
                            (acc, product) =>
                              acc +
                              product.price *
                                product.quantity *
                                (1 - product.discount / 100),
                            0
                          ) + order.totalFee
                        ).format("0,05$")}`}</span>
                      </td>

                      {/* Hiển thị các thông tin khác của đơn hàng */}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          ) : (
            <div className={`flex justify-center items-center`}>
              <IsLoading />
            </div>
          )}
        </div>

        {/* Build UI pagination */}
        <div className="flex flex-col items-center gap-y-3 border-t border-gray-200 bg-white px-4 py-3">
          <div>
            <p className="text-gray-700">
              Hiển thị{" "}
              <span className="font-medium">
                {(pagination.page - 1) * pagination.pageSize + 1}
              </span>{" "}
              đến{" "}
              <span className="font-medium">
                {Math.min(
                  pagination.page * pagination.pageSize,
                  pagination.total
                )}
              </span>{" "}
              của <span className="font-medium">{pagination.total}</span> kết
              quả
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Previous button */}
              <button
                onClick={onChangePrevious}
                disabled={pagination.page === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2  bg-slate-300 text-gray-500 `}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Previous button */}
              <span className="relative z-10 inline-flex items-center px-4 py-2 font-semibold ring-1 ring-inset bg-indigo-600 text-white focus:outline-offset-0">
                {pagination.page}
              </span>

              {/* Page numbers */}
              <button
                onClick={onChangeNext}
                disabled={pagination.count < pagination.pageSize}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2  bg-slate-300 text-gray-500`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
        {/* End build UI panigation */}

        {/* Build modal cập nhật status đơn hàng */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-center justify-center p-3 md:p-4 lg:p-6 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="font-sans relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-md md:max-w-lg lg:max-w-5xl">
                    {/*Build header modal */}
                    <div className="bg-gray-50 px-6 py-10 sm:p-6 sm:pb-4 ">
                      <div className="flex justify-center">
                        <Dialog.Title
                          as="h3"
                          className="flex flex-col items-center gap-y-2 text-lg font-semibold leading-6 text-gray-900 text-center"
                        >
                          <p>Mã đơn hàng {orderDetail._id}</p>
                          <p>
                            Trạng thái:
                            <span
                              className={`inline-block px-2 py-1 rounded text-white ml-2 ${
                                orderDetail.status === "PLACED"
                                  ? "bg-blue-500"
                                  : orderDetail.status === "COMPLETED"
                                  ? "bg-green-500"
                                  : orderDetail.status === "DELIVERING"
                                  ? "bg-orange-500"
                                  : orderDetail.status === "PREPARED"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {statusMapping[orderDetail.status]}
                            </span>
                          </p>
                        </Dialog.Title>
                      </div>
                    </div>
                    {/* End header modal */}

                    {/* Build main modal*/}
                    <div>
                      <div className={`p-4`}>
                        <h3 className="text-2x font-bold mt-2 mb-6 text-center">
                          Chi tiết sản phẩm đặt hàng
                        </h3>
                        {orderDetail &&
                        orderDetail.productList &&
                        Array.isArray(orderDetail.productList) &&
                        orderDetail.productList.length > 0 ? (
                          <div>
                            <table className="mb-5 text-xs md:text-lg lg:text-xl">
                              <thead>
                                <tr className="text-center">
                                  <th className="border-b-2 border-gray-300 px-4 py-2 w-1/2 md:w-1/3 lg:w-1/3">
                                    Sản phẩm
                                  </th>
                                  <th className="border-b-2 border-gray-300 px-4 py-2">
                                    Số lượng
                                  </th>
                                  <th className="border-b-2 border-gray-300 px-4 py-2">
                                    Đơn giá
                                  </th>
                                  <th className="border-b-2 border-gray-300 px-4 py-2">
                                    Giảm giá
                                  </th>
                                  <th className="border-b-2 border-gray-300 px-4 py-2">
                                    Thành tiền
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderDetail.productList.map((item) => (
                                  <tr key={item.productId}>
                                    <td>
                                      <div
                                        className={`flex flex-col md:flex-col lg:flex-row gap-3 items-center gap-x-4 mb-4 mt-3`}
                                      >
                                        <Image
                                          src={item.imageProduct}
                                          width={80}
                                          height={80}
                                          className={`w-full h-auto md:w-1/3 lg:w-1/4 rounded-lg`}
                                        />
                                        <div>
                                          <p>{item.name}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div>{item.quantity}</div>
                                    </td>
                                    <td className="text-right">
                                      {numeral(item.price).format("0,05$")}
                                    </td>
                                    <td className="text-right">
                                      {numeral(
                                        (item.price *
                                          item.discount *
                                          item.quantity) /
                                          100
                                      ).format("0,05$")}
                                    </td>
                                    <td className="text-right">
                                      {numeral(
                                        item.price *
                                          item.quantity *
                                          (1 - item.discount / 100)
                                      ).format("0,05$")}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex flex-row-reverse text-base md:text-lg lg:text-xl">
                              <div
                                className={`flex flex-col gap-y-2 font-sans w-4/5 md:w-4/5 lg:w-3/5 items-end px-4 py-3`}
                              >
                                <div className=" flex w-full items-center justify-end">
                                  <div className="font-bold text-lg w-3/5 text-right">
                                    Tổng tiền:
                                  </div>
                                  <span className={`text-right w-2/5 `}>
                                    {`${numeral(
                                      orderDetail.productList.reduce(
                                        (acc, product) =>
                                          acc +
                                          product.price * product.quantity,
                                        0
                                      )
                                    ).format("0,05$")}`}
                                  </span>
                                </div>

                                <div className="flex w-full items-center justify-end">
                                  <div className="font-bold text-lg w-3/5 text-right">
                                    Giảm giá:
                                  </div>
                                  <span className={`text-right w-2/5 `}>
                                    {`${numeral(
                                      orderDetail.productList.reduce(
                                        (acc, product) =>
                                          acc +
                                          (product.price *
                                            product.quantity *
                                            product.discount) /
                                            100,
                                        0
                                      )
                                    ).format("0,05$")}`}
                                  </span>
                                </div>

                                <div className="flex w-full items-center justify-end">
                                  <div className="font-bold text-lg w-3/5 text-right">
                                    Phí vận chuyển:
                                  </div>
                                  <span className={`text-right w-2/5 `}>
                                    {numeral(orderDetail.totalFee).format(
                                      "0,05$"
                                    )}
                                  </span>
                                </div>

                                <div className=" flex w-full items-center justify-end">
                                  <div className="font-bold text-lg w-3/5 text-right">
                                    Tổng tiền:
                                  </div>
                                  <span className="font-bold w-2/5  text-right text-red-600 text-md md:text-lg lg:text-lg">
                                    {`${numeral(
                                      orderDetail.productList.reduce(
                                        (acc, product) =>
                                          acc +
                                          product.price *
                                            product.quantity *
                                            (1 - product.discount / 100),
                                        0
                                      ) + orderDetail.totalFee
                                    ).format("0,05$")}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>Danh sách sản phẩm trống</p>
                        )}
                      </div>
                    </div>
                    {/* End build main modal */}
                    {/* Build footer modal */}
                    <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                      {/*End build footer modal */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* End build modal status đơn hàng */}
      </div>
    </>
  );
}

export default PurchaseOrder;
