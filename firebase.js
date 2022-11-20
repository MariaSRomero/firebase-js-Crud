// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDUiTYwl_Qv3ldcSbdHWC9aK_Ca8NKZM0",
    authDomain: "fir-javascript-crud-50660.firebaseapp.com",
    projectId: "fir-javascript-crud-50660",
    storageBucket: "fir-javascript-crud-50660.appspot.com",
    messagingSenderId: "391726803591",
    appId: "1:391726803591:web:3ed898be857b3cfccb6622",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();


export const saveTask = (title, description) => 
    addDoc(collection(db, "tasks"), {title, description});
 
export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => 
    onSnapshot(collection(db, 'tasks'),callback);

export const deleteTasks = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTasks = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);