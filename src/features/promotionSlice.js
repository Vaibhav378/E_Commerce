import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";

export const getAllPromo= createAsyncThunk("promoList",async() =>
{
    const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a706ed914amsha0010a26dd586e0p119a56jsn36e8ca7f567e',
            'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log("no error",result);
        return result;
    } catch (error) {
        console.error(error);
    }
//     const response =await fetch("https://fakestoreapi.com/products");
//     const result=response.json();
// console.log(result);
//     return result;
    
});

const initialState={
    promotions:[],
    loading:true,
    error:null,
};

const promotionSlice=createSlice({
    name:"promotion",
    initialState,
    reducers:{
},
extraReducers:{
    [getAllPromo.pending]:(state)=>{
        state.loading=true;
    },
    [getAllPromo.fulfilled]:(state,action)=>{
        //updating each object of an array products fetch from api with the field quantity....
        state.loading=false;
        
        console.log("..loading",state.loading)
        console.log(action.payload);

        //action.payload is a JSON string so we have to convert it into the JavaScript Object....
        const proms=JSON.parse(action.payload).products;
        console.log("...products",proms);
        if(state.promotions.length===0)
        {
            proms?.map((element)=> {
                state.promotions.push(element);
            });
        }
       
    },
    [getAllPromo.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
},

});



export default promotionSlice.reducer;