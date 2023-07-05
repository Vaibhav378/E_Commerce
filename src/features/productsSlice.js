import{createAsyncThunk,createSlice} from "@reduxjs/toolkit";

//action
export const getAllData= createAsyncThunk("prodList",async() =>
{
    // const response =await fetch("https://fakestoreapi.com/products");
    const response =await fetch("https://v1.nocodeapi.com/vaibhav2598/fbsdk/QKvOiMLIUqmIAfes/firestore/allDocuments?collectionName=products");

    const result=response.json();
    
    
console.log(result);
    return result;
    
});

const initialState={
      products:[],
        cart: [],
        totalQuantity: 0,
        totalPrice: 0,
        loading:false,
        error:null,
        status:[],
        
};
const productSlice =createSlice({
    name:"products",
    initialState,
    reducers: {
        addToProducts:(state,action)=>{
            const length= state.products.length;
            let find = state.products.findIndex((item) => item.id === action.payload.id);
            if(find>=0)
            {
                state.products[find].quantity += 1;
            }
            else {
                state.products.push(action.payload);
            }
            console.log(state.products[length].id);
        },
        editProduct: (state,action)=>{
            let find= state.products.findIndex((item) => item.id===action.payload.id);
            state.products[find].title=action.payload.title;
            state.products[find].price=action.payload.price;
            state.products[find].category=action.payload.category;
            state.products[find].description=action.payload.description;
            state.products[find].image=action.payload.image;
            state.products[find].quantity=action.payload.quantity;

        },
        deleteProduct:(state,action)=>{
            let find=state.products.findIndex((item) => item.id === action.payload.id);
            state.products.splice(find,1);
        },

        addToCart: (state,action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload.id);
            console.log("../cart",action.payload);

            if (find >= 0) {
                state.cart[find].quantity += 1;
                
            }
            else {
                state.cart.push(action.payload);

            }

        },
        // getItemQty:(state,action) =>{
        //     let find = state.cart.findIndex((item) => item.id === action.payload.id);

        //     return state.cart[find].quantity;
        // },

        prodStatus:(state,action) =>{
            
            let find = state.cart.findIndex((item) => item.id === action.payload.id);
            let present;
            if(find>=0)
            {
                present=state.status.findIndex((item) => item.id ===action.payload.id);
                
                //if product's status is not present but product is present in the cart...
                if(!(present>=0))
                {
                    let obj={};
                obj["id"]=action.payload.id;
                obj["isPresent"]="active";
                state.status.push(obj);
                }
            }
            else{
                present=state.status.findIndex((item) => item.id ===action.payload.id);

                //for deleting an object from an array...
                state.status.splice(present,1);

            }

        },
        
        //reduce is used for returning the single value based on the initial value
        //here the value returned is the cartTotal and the value for reference is cartItem..
        getCartTotal: (state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    // console.log("carttotal", cartTotal);
                    // console.log("cartitem", cartItem);

                    //for each item in the cart we are extracting two values price and quantity
                    const { price, quantity } = cartItem;
                    // console.log(price, quantity);
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                //totalPrice and totalQuantity are the two variables for the cartTotal
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                }
            );
            //parseInt is used parsing the string argument to the integer of fixed precision .... while toFixed is used for specifying the precision of the integer..
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        },

        //filter is used for filtering out the result based on the specific condition
        removeItem: (state, action) => {
            console.log("cart item id",action.payload)
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },

        increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    const newQuantity = parseInt(item.quantity) + 1;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        },
        decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    const newQuantity = parseInt(item.quantity) - 1
                    return { ...item, quantity:newQuantity};
                }
                return item;
            });
        },
        
    },
    extraReducers:{
        [getAllData.pending]:(state)=>{
            state.loading=true;
        },
        [getAllData.fulfilled]:(state,action)=>{
            //updating each object of an array products fetch from api with the field quantity....
            state.loading=false;
           
           action.payload.map((element)=> {
                // element['price']*=10;
                // Math.round(element['price']);
                // element['quantity'] = 1;
                const data={
                    id: element["_fieldsProto"]["id"]["stringValue"],
                    title: element["_fieldsProto"]["title"]["stringValue"],
                    price: element["_fieldsProto"]["price"]["integerValue"],
                    category: element["_fieldsProto"]["category"]["stringValue"],
                    description: element["_fieldsProto"]["description"]["stringValue"],
                    image: element["_fieldsProto"]["image"]["stringValue"],
                    quantity:parseInt(element["_fieldsProto"]["quantity"]["integerValue"]),
                };

                state.products.push(data);
                console.log("...data/",data);
            });
          
          
        },
        [getAllData.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
});

//named export
export const { updateProd,addToCart, getCartTotal,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,addToProducts,prodStatus,deleteProduct,editProduct} = productSlice.actions;

export default productSlice.reducer;