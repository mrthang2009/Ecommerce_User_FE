import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
      {/* Cấu hình thông báo message */}
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"s
    />
    </>
  );
}
