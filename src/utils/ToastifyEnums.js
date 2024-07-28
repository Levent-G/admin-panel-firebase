import { toast } from 'react-toastify';

export const notify = (message, type = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
  });
};