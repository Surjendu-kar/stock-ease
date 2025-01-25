import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'src/auth/config';
import { StudentProps } from 'src/sections/students/student-table-row';

const COLLECTION = 'students';

export const studentService = {
  getAll: async (userId: string) => {
    const q = query(collection(db, COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (document) => ({ id: document.id, ...document.data() }) as StudentProps
    );
  },

  add: async (student: Omit<StudentProps, 'id'>) => {
    return addDoc(collection(db, COLLECTION), student);
  },
  update: async (id: string, student: Partial<StudentProps>) =>
    updateDoc(doc(db, COLLECTION, id), student),

  delete: async (id: string) => deleteDoc(doc(db, COLLECTION, id)),
};
