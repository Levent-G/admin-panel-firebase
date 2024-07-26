import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// Belirli bir bölüm ID'sine sahip bölümü silme servisi
export const bolumSilService = async (pageId, bolumId) => {
  try {
    // Silinecek bölüme ait belge referansını al
    const bolumRef = doc(db, 'pages', pageId, 'bolumler', bolumId);

    // Belgeyi sil
    await deleteDoc(bolumRef);

    console.log("Bölüm başarıyla silindi!");
  } catch (error) {
    console.error("Belge silinirken bir hata oluştu: ", error.message); // Hata mesajını daha net görebilmek için
  }
};
