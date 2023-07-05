import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getDatabase,ref,set} from "firebase/database";
import {getFirestore,collection,addDoc,doc,setDoc}  from 'firebase/firestore';


const firebaseConfig={
    apiKey: "AIzaSyCKLyM8f0Wk4UWQa1bymy7-aFbI0zMvkck",
    authDomain: "auth-development-b5a96.firebaseapp.com",
    projectId: "auth-development-b5a96",
    storageBucket: "auth-development-b5a96.appspot.com",
    messagingSenderId: "408079293573",
    appId: "1:408079293573:web:2fe6cf774295fd25aa5dec"
};

const app=initializeApp(firebaseConfig);
const db=getDatabase();
const firestore =getFirestore();

//for cloud firestore...firestore is preferred when we have to fetch data through an api
export function storeProductData(prod_id,prod_title,prod_price,prod_image,prod_company,prod_description,prod_category,prod_quantity,prod_stock)
{
    const docReference=doc(firestore,'products',prod_id);

    setDoc(docReference,{
        id:prod_id,
        title:prod_title,
        price:prod_price,
        image:prod_image,
        company:prod_company,
        description:prod_description,
        category:prod_category,
        quantity:prod_quantity,
        stock:prod_stock
    });
//     const collectionRef=collection(firestore,'products');
//     const data={
//         id:prod_id,
//         title:prod_title,
//         price:prod_price,
//         image:prod_image,
//         company:prod_company,
//         description:prod_description,
//         moreInfo:prod_moreInfo,
//         category:prod_category,
//         quantity:prod_quantity,
//         stock:prod_stock

//     };
    
//     addDoc(collectionRef, data)
//   .then((docRef) => {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch((error) => {
//     console.error('Error adding document: ', error);
//   });

}

//for real-time database
export function writeProductsData(prod_id,prod_title,prod_price,prod_image,prod_company,prod_description,prod_category,prod_quantity,prod_stock)
{
    const reference =ref(db,'products/' + prod_id);
    set(reference,{
        id:prod_id,
        title:prod_title,
        price:prod_price,
        image:prod_image,
        company:prod_company,
        description:prod_description,
        category:prod_category,
        quantity:prod_quantity,
        stock:prod_stock
    });
} 







export const auth = getAuth(app);

export default app; 