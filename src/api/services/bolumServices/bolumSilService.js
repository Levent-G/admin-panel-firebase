import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const bolumSilService = async (pageId, bolumId) => {
  try {
    const bolumRef = doc(db, 'pages', pageId, 'bolumler', bolumId);

    await deleteDoc(bolumRef);

    console.log("Bölüm başarıyla silindi!");
  } catch (error) {
    console.error("Belge silinirken bir hata oluştu: ", error.message); 
  }
};
