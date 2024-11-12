import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, query, where,doc, getDoc, setDoc, increment } from "firebase/firestore"; 
import { app } from "./firebase"

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Obtén el token de acceso de Google
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // Información del usuario
    const user = result.user;
    console.log("Usuario conectado con Google:", user);
    return user;
  } catch (error) {
    // Manejo de errores
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Error al iniciar sesión con Google:", errorCode, errorMessage, email, credential);
  }
};
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario registrado:", user);
    return true;
  } catch (error) {
    console.error("Error al registrar el usuario:", error.code, error.message);
  }
};

// Función para iniciar sesión de usuario
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario iniciado sesión:", user);
    return true;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.code, error.message);
  }
};