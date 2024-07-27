import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const sayfaEkleService = async (data) => {
  const { sayfaName, bolumList, user } = data;

  try {
    const pageRef = await addDoc(collection(db, 'pages'), { sayfaName, user });

    localStorage.setItem('pageToken', pageRef.id);

    for (const bolum of bolumList) {
      await addDoc(collection(db, 'pages', pageRef.id, 'bolumler'), bolum);
    }
  } catch (error) {
    console.error("Error writing document: ", error.message);
  }
};
