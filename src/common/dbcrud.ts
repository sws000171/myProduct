import { collection, onSnapshot, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const diaryCollection = collection(db, 'myDiary');
const diaryQuery = query(diaryCollection, orderBy('title', 'desc'));

export const getFirebase = async () =>{
  isLoading.value = true
  try {
    onSnapshot(diaryQuery, (QuerySnapshot) => {
      const fbDiary: { id: string; title: string; text: string; }[] = [];
      QuerySnapshot.forEach((doc) => {
        const diary = {
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
        };
        fbDiary.push(diary);
      });
      myDiary.value = fbDiary;
    });
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}

function deleteDiary(id:string) {
  deleteDoc(doc(diaryCollection,id))
  console.log('delete');
}