// src/utils/notify.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, type = 'success') => {
  toast[type](message);
};
