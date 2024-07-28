import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../../../utils/ToastifyEnums";

export const bolumEkleService = async (pageId, bolumData) => {
  try {
    const bolumlerRef = collection(db, 'pages', pageId, 'bolumler');

    await addDoc(bolumlerRef, bolumData);

    notify("Bölüm başarıyla eklendi!", "success");

  } catch (error) {
    notify("Bölüm eklenirken bir hata oluştu!", "error");
  }
};
