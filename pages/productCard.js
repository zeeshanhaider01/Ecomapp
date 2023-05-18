import { useRef, useState } from 'react';
import styles from '../styles/productcard.module.css';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removefromCart, cartarray,cartobj } from './slice';

export default function ProductCard(props){
    const cartobject=useSelector(cartobj)
    const [title,settitle]=useState(cartobject[props.id]?"Remove from Cart":"Add to Cart")
    const dispatch=useDispatch()
    const addToCarthandler=(event)=>{
        event.preventDefault()
        // console.log("prop.id: ",props["id"])
        dispatch(
            addToCart(
                {id:props['id'],value:Number(1)}
            )
        )
        settitle("Remove from Cart")
    }
    const removefrom_Carthandler=(event)=>{
        event.preventDefault()
        dispatch(
            removefromCart(
                {id:props['id']}
            )
        )
        settitle("Add to Cart")
    }

    return(
        <div className={styles.productcard} key={props.id}>
            <div className={styles.productcard_imgdiv}>
                <img className={styles.productcard_imgdiv_img} src={props.image}/>
            </div>
            <div className={styles.productcard_detaildiv}>
                <div className={styles.productcard_detaildiv_category}>{props.category}</div>
                <div className={styles.productcard_detaildiv_title}>{props.title}</div>
                {/* <div className={styles.productcard_detaildiv_details}>{props.description}</div> */}
            </div>
            
            <div className={styles.productcard_priceratingdiv}>
                <div className={styles.productcard_priceratingdiv_price}>RS.{props.price}</div>
                <div className={styles.productcard_priceratingdiv_ratediv}>
                    <div className={styles.productcard_priceratingdiv_ratediv_title}>Rating({props.rate})</div>
                    <div className={styles.productcard_priceratingdiv_ratediv_datadiv}>
                        <div className={styles.productcard_priceratingdiv_ratediv_datadiv_rangedivmain}>
                            <div className={styles.productcard_priceratingdiv_ratediv_datadiv_rangedivmain_range} style={{width:String(String((props.rate/5)*100)+"%")}}></div>
                            
                        </div>
                        <div className={styles.productcard_priceratingdiv_ratediv_datadiv_count}>{String(" "+String((props.count)))}</div>
                    </div>
                    <div className={styles.productcard_priceratingdiv_ratediv_cartdiv}>
                        <Button className={styles.productcard_priceratingdiv_ratediv_cartdiv_button} onClick={(e)=>(title==="Add to Cart")?addToCarthandler(e):removefrom_Carthandler(e)}>{title}</Button>
                        
                    </div>
                </div>
                
            </div>

        </div>
    )
}
    