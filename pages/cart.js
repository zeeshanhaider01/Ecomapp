import { useSelector } from "react-redux";
import { cartobj } from "./slice";
import styles from '../styles/cart.module.css';

export default function Cartcount(){
    const cart=useSelector(cartobj)
    console.log("cartitems: ",cart)
    return(
        <div className={styles.cartdiv}></div>
    )
}