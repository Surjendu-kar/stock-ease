import type { StudentProps } from 'src/sections/students/types/student-types';

import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import { db } from 'src/auth/config';

const COLLECTION = 'students';

export const studentService = {
  getAll: async (userId: string) => {
    const q = query(collection(db, COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (document) => ({ id: document.id, ...document.data() }) as StudentProps
    );
  },

  add: async (student: Omit<StudentProps, 'id'>) => addDoc(collection(db, COLLECTION), student),

  update: async (id: string, student: Partial<Omit<StudentProps, 'id'>>) =>
    updateDoc(doc(db, COLLECTION, id), student),

  delete: async (id: string) => deleteDoc(doc(db, COLLECTION, id)),
};
