import type { StudentProps } from 'src/sections/students/types/student-types';

import { doc, addDoc, getDocs, updateDoc, deleteDoc, collection } from 'firebase/firestore';

import { db } from 'src/auth/config';

export const studentService = {
  getAll: async (userId: string) => {
    // Get students from subcollection
    const studentsRef = collection(db, 'users', userId, 'students');
    const querySnapshot = await getDocs(studentsRef);

    return querySnapshot.docs.map(
      (document) => ({ id: document.id, ...document.data() }) as StudentProps
    );
  },

  add: async (userId: string, student: Omit<StudentProps, 'id'>) => {
    // Add to students subcollection
    const studentsRef = collection(db, 'users', userId, 'students');
    return addDoc(studentsRef, student);
  },

  update: async (userId: string, studentId: string, student: Partial<Omit<StudentProps, 'id'>>) => {
    // Update student in subcollection
    const studentRef = doc(db, 'users', userId, 'students', studentId);
    return updateDoc(studentRef, student);
  },

  delete: async (userId: string, studentId: string) => {
    // Delete student from subcollection
    const studentRef = doc(db, 'users', userId, 'students', studentId);
    return deleteDoc(studentRef);
  },
};
