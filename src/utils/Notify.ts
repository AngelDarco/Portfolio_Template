import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Notify {
  static error(message: string) {
    toast.error(message || "🦄 ups, something went wrong", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  static success(message: string) {
    toast(message || "🦄 all done", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  static promise(callback: Promise<void>, message: string) {
    toast.promise(
      callback,
      {
        pending: message,
        success: "🦄 all done",
        error: "🦄 ups, something went wrong",
      },
      {
        autoClose: 2000,
      }
    );
  }
}
