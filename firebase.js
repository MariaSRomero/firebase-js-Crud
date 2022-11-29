import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc, } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, uploadBytes, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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
const storage = getStorage();


export const saveTask = (title, description, imageUrl) => addDoc(collection(db, 'tasks'), { title, description, imageUrl });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, 'tasks'), callback);

export const deleteTasks = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTasks = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);
  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.querySelector('#progress').value = progress;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value = 'Fin!';
        document.querySelector('#image').src = downloadURL;
        console.log('File available at', downloadURL);
      });
    }
  );

}