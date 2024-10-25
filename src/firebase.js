import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, query, where,doc, getDoc, setDoc, increment } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPiOLfGgybytWLryxYiuHcpP6prcDnXvI",
  authDomain: "barberia-vem.firebaseapp.com",
  projectId: "barberia-vem",
  storageBucket: "barberia-vem.appspot.com",
  messagingSenderId: "204661265008",
  appId: "1:204661265008:web:da7000367d0c3e0dfd5ab5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createItem = async (data,colec) => {
    try {
      const docRef = await addDoc(collection(db, colec), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
};

export const readItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (e) {
      console.error("Error reading documents: ", e);
    }
};

export const updateItem = async (id, updatedData) => {
    const docRef = doc(db, "items", id);
  
    try {
      await updateDoc(docRef, updatedData);
      console.log("Document updated");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
};

export const deleteItem = async (id) => {
    const docRef = doc(db, "items", id);
  
    try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
};

export const loginAcc = async (usuario, pass) => {
  const q = query(
    collection(db, "Login"),
    where("email"||"phone", "==", usuario),
    where("password", "==", pass)
  );

  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const user = querySnapshot.docs[0].data();
    return user; // Si las credenciales son correctas, devuelve el usuario
  } else {
    return null; // Si no hay coincidencias, devuelve null
  }
};

const getNextId = async () => {
  const counterDocRef = doc(db, "counters", "itemsCounter"); // Documento donde almacenarás el contador
  const counterSnap = await getDoc(counterDocRef);

  if (!counterSnap.exists()) {
    // Si el contador no existe, lo inicializas en 1
    await setDoc(counterDocRef, { count: 1 });
    return 1;
  } else {
    // Si ya existe, lo incrementas
    const currentCount = counterSnap.data().count;
    await updateDoc(counterDocRef, { count: increment(1) });
    return currentCount + 1;
  }
};

// Función para crear un nuevo documento con el ID auto-incremental
export const createItemId = async (name,data) => {
  try {
    const nextId = await getNextId(); // Obtén el próximo ID
    const docRef = await setDoc(doc(db, name, nextId.toString()), data); // Crea el documento con el ID
    console.log("Document written with ID: ", nextId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
