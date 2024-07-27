import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const sayfaDuzenleService = async (pageId, updatedData, bolumId) => {
  try {
    // Belirtilen sayfadaki bölümler koleksiyonunu al
    const bolumRef = doc(db, "pages", pageId, "bolumler", bolumId);
    const pagesRef = doc(db, "pages", pageId);

    // Belgeyi al
    const bolumDoc = await getDoc(bolumRef);
    const pagesDoc = await getDoc(pagesRef);

    // Belge varsa güncelle
    if (bolumDoc.exists()) {
      await updateDoc(bolumRef, { ad: updatedData.bolumler });
    }
    if (pagesDoc.exists()) {
      await updateDoc(pagesRef, { sayfaName: updatedData.sayfaName });
    } else {
      console.error("Document not found");
    }
  } catch (error) {
    console.error("Error updating document: ", error.message); 
  }
};
