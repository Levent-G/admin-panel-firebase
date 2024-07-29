import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../../../utils/ToastifyEnums";

export const bolumleriGetirService = async (pageId, setBolumlerList) => {
  try {
    const bolumlerRef = collection(db, 'pages', pageId, 'bolumler');
    const bolumlerSnapshot = await getDocs(bolumlerRef);

    const bolumler = bolumlerSnapshot.docs.map(doc => ({ text: doc.data().ad }));
    setBolumlerList(bolumler);

  } catch (error) {
    notify("Bölümler getirilirken bir hata oluştu!", "error");
    setBolumlerList([]);
  }
};
