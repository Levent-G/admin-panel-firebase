import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Yeni bir bölüm ekleme servisi
export const bolumEkleService = async (pageId, bolumData) => {
  try {
    // Belirtilen sayfanın 'bolumler' koleksiyonuna referans al
    const bolumlerRef = collection(db, 'pages', pageId, 'bolumler');

    // Yeni bölümü 'bolumler' koleksiyonuna ekle
    await addDoc(bolumlerRef, bolumData);

    console.log("Bölüm başarıyla eklendi!");
  } catch (error) {
    console.error("Bölüm eklenirken bir hata oluştu: ", error.message); // Hata mesajını daha net görebilmek için
  }
};
