import {createSlice} from "@reduxjs/toolkit";


const initialState={
    currentUser:{},
    authenticated:false,
    loading:true,
    error:null,
};

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{

        setUser: (state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
            state.authenticated=true;

            console.log("current user Email:",state.currentUser.email);
        },
        updateUser: (state,action)=>{
            state.currentUser=action.payload;
        },

        deleteUser: (state)=>{
            state.currentUser={};
            state.loading=true;
            state.error=null;
            state.authenticated=false;

        }
}

});

export const {setUser,updateUser,deleteUser} = userSlice.actions;

export default userSlice.reducer;