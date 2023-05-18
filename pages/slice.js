import { createSlice } from "@reduxjs/toolkit";

export const Cart= createSlice({
    name:'cartitems',
    initialState:{
        value:{} // we will store id as keys in this function {product_id:product_count}=== {1:2}
     },
    reducers:{
        //when user press the button it will add item to Cart
            //to increase and decrease the quantity of certain product we have to write to 
            //other function 
            //1-increment function 
            //2-decrement function 
        addToCart:(state,action)=>{  //when user press the button it will add item to Cart
            if(action.payload.value!==0)
            state.value[action.payload.id]=action.payload.value
            // console.log(state.value)
            else{
                state.value=Object.keys(state.value).filter((item)=>item!=action.payload.id).
                reduce((total,key)=>Object.assign(total,{[key]:state.value[key]}),{})
            }
        },
        removefromCart:(state,action)=>{
            state.value=Object.keys(state.value).filter((item)=>item!=action.payload.id).
            reduce((total,key)=>Object.assign(total,{[key]:state.value[key]}),{})
        },
        increment:(state,action)=>{
            state.value[action.payload.id]+=1
        },
        decrement:(state,action)=>{
            if (state.value[action.payload.id]>0){
                state.value[action.payload.id]-=1
                if(state.value[action.payload.id]===0){
                    state.value=Object.keys(state.value).filter((item)=>item!=action.payload.id).
                    reduce((total,key)=>Object.assign(total,{[key]:state.value[key]}),{})
                }
            }
        }
    },
})

export const {addToCart,removefromCart,increment,decrement}=Cart.actions
export const cartobj = (state)=>state.cartitems.value
export default Cart.reducer



///////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// import { createSlice } from "@reduxjs/toolkit";

// export const Cart= createSlice({
//     name:'cartitems',
//     initialState:{
//         value:[]
//     },
//     reducers:{
//         addToCart:(state,action)=>{
//             state.value.push(action.payload.id)
//         },
//         removefromCart:(state,action)=>{
//             state.value=state.value.filter((item)=>item!=action.payload.id)
//         }
//     },
// })

// export const {addToCart,removefromCart}=Cart.actions
// export const cartarray = (state)=>state.cartitems.value
// export default Cart.reducer
///////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// import { createSlice } from "@reduxjs/toolkit";

// export const counterSlice= createSlice({
//     name:'counter',
//     initialState:{
//         value:0
//     },
//     reducers:{
//         increment:state=>{
//             state.value+=1
//         },
//         decrement:state=>{
//             state.value-=1
//         },
//     },
// })

// export const {increment,decrement}=counterSlice.actions
// export const selectCount = (state) => state.counter.value
// export default counterSlice.reducer