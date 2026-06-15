import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function error() {
  iziToast.error({
    title: "❌",
    message: "Something went wrong!"
  });
}

export function success(message: string) {
  iziToast.success({
    title: "✅",
    message: message,
  });
}
