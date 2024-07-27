import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const bolumEkleService = async (pageId, bolumData) => {
  try {
    const bolumlerRef = collection(db, 'pages', pageId, 'bolumler');

    await addDoc(bolumlerRef, bolumData);

    console.log("Bölüm başarıyla eklendi!");
  } catch (error) {
    console.error("Bölüm eklenirken bir hata oluştu: ", error.message); 
  }
};
