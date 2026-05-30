import Toast from 'typescript-toastify';
import "typescript-toastify/lib/style.css";

type ToastType = "success" | "error" | "warning" | "info" | "default";

export const showToast = ({ message, type }: { message: string; type: ToastType }) => {
    const toast = new Toast({
      position: "top-right",
      toastMsg: message,
      autoCloseTime: 2000,
      canClose: true,
      showProgress: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      type: type,
      theme: "dark"
    });

    if (typeof toast.push === 'function') {
        toast.push();
    }
};
