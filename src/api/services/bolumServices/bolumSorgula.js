import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { notify } from "../../../utils/ToastifyEnums";

export const bolumSorgula = async (pageId, bolumAdi) => {
  console.log(bolumAdi)
  try {
    const bolumlerRef = collection(db, 'pages', pageId, 'bolumler');
  
    const q = query(bolumlerRef, where("ad", "==", bolumAdi));

    const querySnapshot = await getDocs(q);


    if (!querySnapshot.empty) {
      notify("Bölüm başarıyla bulundu!", "success");
    } else {
      notify("Bölüm bulunamadı!", "error");
    }

  } catch (error) {
    notify("Bölüm bulunamadı!", "error");
    console.error("Error fetching documents: ", error);
  }
};
