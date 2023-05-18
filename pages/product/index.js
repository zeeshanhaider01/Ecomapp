import React from "react";
import store from '../store.js';
import { Provider, useSelector } from 'react-redux';

export default function indexfoo(){
    // console.log("store.getState(): ",store.getState())
    return(
        <Provider store={store}>
            <div>this is product detail page</div>
        </Provider>
        
    )
}