import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getSayfaWithBolumler = async (sayfaId) => {
  try {
    // Sayfa bilgilerini almak için
    const pageDocRef = doc(db, 'pages', sayfaId);
    const pageSnapshot = await getDoc(pageDocRef);

    if (!pageSnapshot.exists()) {
      console.log("No matching document.");
      return { page: null, bolumler: [] }; // Boş veri döndür
    }

    const pageData = { id: pageSnapshot.id, ...pageSnapshot.data() };

    // Bölümleri almak için
    const bolumlerRef = collection(db, 'pages', sayfaId, 'bolumler');
    const bolumlerSnapshot = await getDocs(bolumlerRef);

    const bolumler = bolumlerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { page: pageData, bolumler };
  } catch (error) {
    console.error("Error getting documents: ", error.message);
    return { page: null, bolumler: [] }; // Hata durumunda boş veri döndür
  }
};
