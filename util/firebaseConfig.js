import { initializeApp } from "firebase/app";
// 1. DEĞİŞEN KISIM: getAuth yerine initializeAuth ve persistence özelliklerini çağırdık
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. YENİ EKLENEN KISIM: Az önce indirdiğimiz Hafıza Defteri
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase web sitesinden aldığın KENDİ BİLGİLERİNİ buraya yapıştıracaksın:
const firebaseConfig = {
  apiKey: "AIzaSyCcBZZ72yAXN0ALXZBdwmOe8BXD8TfCs0s",
  authDomain: "recipe-000.firebaseapp.com",
  projectId: "recipe-000",
  storageBucket: "recipe-000.firebasestorage.app",
  messagingSenderId: "46997385147",
  appId: "1:46997385147:web:d1342885ff40c46a105e9e",
};

const app = initializeApp(firebaseConfig);

// 3. DEĞİŞEN KISIM: Eskiden "export const auth = getAuth(app);" yazıyordu.
// Şimdi Firebase'e "Kullanıcı giriş yaptığında onu AsyncStorage'a (Hafıza defterine) kaydet" diyoruz.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
