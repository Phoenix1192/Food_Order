import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) =>{

switch(action.type){
    case "ADD":
       { return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}];}
    case "REMOVE":
       { let newArr = [...state]
        newArr.splice(action.index,1)  // parameter 1 says that we must delete exactly one element in the array
        return newArr}
    case "UPDATE":
   { let arr = [...state]
    arr.find((food,index)=>{
        if(food.id === action.id){
            arr[index] = {...food,qty:parseInt(action.qty) + food.qty,price: action.price + food.price}
        } // syntax demands us to return the arr from the find function back to the place where it was called from 
        return arr
    }) // we then return the arr and update the state
    return arr}
    case "DROP":
     {   let emparr = []
        return emparr // returns an empty array for dropping
    }
    default: 
        console.log("Error in reducer")
}
}

export const CardProvider = ({children})=>{
// this is the syntax to make both dispatch and state of the useReducer hook a global one 
const[state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}
export const useCart = ()=> useContext(CartStateContext)
export const useDispatchCart = ()=> useContext(CartDispatchContext);