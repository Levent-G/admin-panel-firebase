import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../../../utils/ToastifyEnums";

export const sayfaDuzenleService = async (pageId, updatedData, bolumId) => {
  try {
    const bolumRef = doc(db, "pages", pageId, "bolumler", bolumId);
    const pagesRef = doc(db, "pages", pageId);

    const bolumDoc = await getDoc(bolumRef);
    const pagesDoc = await getDoc(pagesRef);

    if (bolumDoc.exists()) {
      await updateDoc(bolumRef, { ad: updatedData.bolumler });
    }
    if (pagesDoc.exists()) {
      await updateDoc(pagesRef, { sayfaName: updatedData.sayfaName });
    } else {
      console.error("Document not found");
    }
    notify("Sayfa başarıyla düzenlendi!", "success");

  } catch (error) {
    console.error("Error updating document: ", error.message); 
    notify("Sayfa düzenlenmedi!", "error");
  }
};
