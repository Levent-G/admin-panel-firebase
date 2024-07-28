import { toast } from 'react-toastify';

export const notify = (message, type = "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
  });
};