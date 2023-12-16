import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import numeral from "numeral";
import "numeral/locales/vi";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// Kiểm tra token
import { toast } from "react-toastify";
import axiosClient from "@/libraries/axiosClient";
import withTokenCheckFunction from "../../../middleware/WithTokenCheckFunction";
import IsLoading from "../IsLoadingSmall";

numeral.locale("vi");

function ModalAddToCart({ open, setOpen, products, getCart }) {
  const cancelButtonRef = useRef(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [valueInput, setValueInput] = useState({
    quantity: 1,
  });

  const handleIncreaseQuantity = () => {
    setValueInput((prevState) => ({
      ...prevState,
      quantity: prevState.quantity + 1,
    }));
  };

  const handleDecreaseQuantity = () => {
    if (valueInput.quantity > 1) {
      setValueInput((prevState) => ({
        ...prevState,
        quantity: prevState.quantity - 1,
      }));
    }
  };

  // Hỗ trợ lấy giá trị onChange các input
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = Number(e.target.value);
    setValueInput((prevState) => ({
      ...prevState,
      [inputName]: inputValue,
    }));
  };

  const handleAddToCart = useCallback(withTokenCheckFunction(async (valueInput) => {
    try {
      if (valueInput.quantity >= 1) {
        const values = {
          productId: products.id,
          quantity: valueInput.quantity,
        };
        //Ngăn cản việc bấm thêm vào giỏ hàng quá nhiều lần
        setButtonDisabled(true);
        await axiosClient.post("/carts", values);
        setValueInput((prevState) => ({
          ...prevState,
          quantity: 1,
        }));

        setOpen(false);
        await getCart();
        toast.success("Thêm giỏ hàng thành công");
      } else {
        toast.warning("Vui lòng số lượng");
      }

      
    } catch (error) {
      console.error(error);
      setButtonDisabled(false);
      // toast.error("Số lượng đặt sản phẩm vượt quá")
      if (error.response) {
        // Lỗi trả về từ API
        const errorMessage = error.response.data.errors;
        toast.error(errorMessage);
      } else {
        toast.error("Đã xảy ra lỗi khi thêm vào giỏ hàng");
      }
    }
  }), []);

  //Mỗi lần mở modal state thay đổi giá trị
  useEffect(() => {
    setValueInput((prevState) => ({
      ...prevState,
      quantity: 1,
    }));
    setButtonDisabled(false);
  }, [open]);
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          setOpen(false);
        }}
        initialFocus={cancelButtonRef}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full font-sans text-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"></div>
              {/* Build form  */}
              <div className="flex items-center">
                <div className="w-1/2">
                  <img
                    src={products.media.coverImageUrl}
                    alt={products.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-4 w-1/2 p-4">
                  <h2 className="text-xl text-center font-bold ">
                    {products.name}
                  </h2>
                  <div className="text-base ">{products.description}</div>
                </div>
              </div>
              {/* End build form */}
              <div className="bg-gray-50 flex-col gap-y-2 pb-4">
                <div className="px-4 py-3 flex justify-start flex-row-reverse items-center gap-x-2">
                  <div className="text-2xl font-bold flex items-center w-full justify-end">
                    {numeral(valueInput.quantity * products.price).format(
                      "0,05$"
                    )}
                  </div>
                </div>                
                <div className="flex flex-row-reverse items-center pr-5 pb-3 h-12 gap-x-3">
                  <button
                    type="button"
                    className="w-fit inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600  font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm md:text-base lg:text-base"
                    onClick={() => handleAddToCart(valueInput)}
                    disabled={isButtonDisabled}
                  >
                      {isButtonDisabled ?
                      (<div className = {`flex justify-center items-center gap-x-3`}>
                          <IsLoading/>            
                        <p>Thêm vào giỏ hàng</p>
                      </div>):(<p>Thêm vào giỏ hàng</p>)
                      }
                  </button>

                  <div className="flex items-center w-2/5 justify-center h-full">
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-700 hover:bg-gray-400 px-3 py-1 h-full rounded-l-full focus:outline-none flex items-center justify-center"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      value={valueInput.quantity}
                      onChange={handleInputChange}
                      className="w-full block px-3 py-2 h-full text-center bg-gray-100"
                      // readOnly
                    />
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-700 hover:bg-gray-400 px-3 py-1 h-full rounded-r-full focus:outline-none flex items-center justify-center"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default ModalAddToCart;
