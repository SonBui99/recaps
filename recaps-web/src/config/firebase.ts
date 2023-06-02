import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaDlK2AMhXSBYeHHMntbgeIfkm0kOWU7k",
  authDomain: "movie-354202.firebaseapp.com",
  projectId: "movie-354202",
  storageBucket: "movie-354202.appspot.com",
  messagingSenderId: "361039675543",
  appId: "1:361039675543:web:9969fbffa4df40e3dca9d2",
  measurementId: "G-YW44SW1RR8",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;