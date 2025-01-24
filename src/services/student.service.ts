import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'src/auth/config';
import { StudentProps } from 'src/sections/students/student-table-row';

const COLLECTION = 'students';

export const studentService = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION));
    return querySnapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as StudentProps
    );
  },

  add: async (student: Omit<StudentProps, 'id'>) => addDoc(collection(db, COLLECTION), student),

  update: async (id: string, student: Partial<StudentProps>) =>
    updateDoc(doc(db, COLLECTION, id), student),

  delete: async (id: string) => deleteDoc(doc(db, COLLECTION, id)),
};
