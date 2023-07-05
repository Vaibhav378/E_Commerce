import { configureStore } from "@reduxjs/toolkit";
import prodReducer from "../features/productsSlice";
import userReducer from "../features/usersSlice";
import promoReducer from "../features/promotionSlice"

const store=configureStore({
    reducer:{
       allCarts:prodReducer,
       Users:userReducer,
       promo:promoReducer,
    },
});

export default store;