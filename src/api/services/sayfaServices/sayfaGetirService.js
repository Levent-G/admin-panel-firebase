import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getSayfaWithBolumler = async (sayfaId) => {
  try {
    const pageDocRef = doc(db, 'pages', sayfaId);
    const pageSnapshot = await getDoc(pageDocRef);

    if (!pageSnapshot.exists()) {
      return { page: null, bolumler: [] }; 
    }

    const pageData = { id: pageSnapshot.id, ...pageSnapshot.data() };

    const bolumlerRef = collection(db, 'pages', sayfaId, 'bolumler');
    const bolumlerSnapshot = await getDocs(bolumlerRef);

    const bolumler = bolumlerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { page: pageData, bolumler };
  } catch (error) {
    console.error("Error getting documents: ", error.message);
    return { page: null, bolumler: [] }; 
  }
};
