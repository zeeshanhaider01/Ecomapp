import {configureStore} from '@reduxjs/toolkit'
import  Reducer  from './slice'

export default configureStore({
    reducer:{
        cartitems: Reducer
    }
})