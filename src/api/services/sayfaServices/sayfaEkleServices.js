import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const sayfaEkleService = async (data) => {
  const { sayfaName, bolumList, user } = data;

  try {
    // Sayfa adı ve kullanıcı bilgilerini içeren belgeyi ekleyin
    const pageRef = await addDoc(collection(db, 'pages'), { sayfaName, user });

    // Bölümleri ayrı ayrı belge olarak ekleyin
    for (const bolum of bolumList) {
      await addDoc(collection(db, 'pages', pageRef.id, 'bolumler'), bolum);
    }
  } catch (error) {
    console.error("Error writing document: ", error.message); // Hata mesajını daha net görebilmek için
  }
};
