// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes,
        uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBDUiTYwl_Qv3ldcSbdHWC9aK_Ca8NKZM0",
  authDomain: "fir-javascript-crud-50660.firebaseapp.com",
  projectId: "fir-javascript-crud-50660",
  storageBucket: "fir-javascript-crud-50660.appspot.com",
  messagingSenderId: "391726803591",
  appId: "1:391726803591:web:3ed898be857b3cfccb6622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) =>
  addDoc(collection(db, 'tasks'), { title, description });

const storage = getStorage();

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);

  const storageRef = ref(storage, `Images/${file.name}`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('La carga está en un ' + progress + '%');
    document.querySelector('#progress').style.width = `${progress}%`;
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //document.querySelector('#progress').value = '¡Completado!'
      document.querySelector('#image').src = downloadURL;
      console.log('File available at', downloadURL);
    });
  }
);}