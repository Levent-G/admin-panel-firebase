import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../../../utils/ToastifyEnums";

export const bolumSilService = async (pageId, bolumId) => {
  try {
    const bolumRef = doc(db, 'pages', pageId, 'bolumler', bolumId);

    await deleteDoc(bolumRef);

    notify("Bölüm başarıyla silindi!", "success");

  } catch (error) {
    notify("Belge silinirken bir hata oluştu!", "error");
  }
};
