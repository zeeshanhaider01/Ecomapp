import React, { useEffect, useState, useRef } from "react";
import styles from '../../styles/[id].module.css';
import { useRouter } from "next/router";
import Link from "next/link";
import axios from 'axios';
import { Button, Input } from "antd";
import { useDispatch, useSelector, getState } from "react-redux";

import { addToCart,increment,decrement, cartobj } from "../slice";


export default function foo(){
    const [data,setdata]=useState([])
    const [cart_count,setCart_count]=useState(0)
    const cartobject=useSelector(cartobj)
    const [title,settitle]=useState("Add to Cart")
    const ref_addtocart=useRef("")
    const ref_incdec=useRef("")
    const ref_inputbox=useRef("")
    const router=useRouter()
    const dispatch=useDispatch()
    // const val=getState()
    const { asPath, pathname } = useRouter();
  console.log("asPath: ",asPath); // '/blog/xyz'
  console.log("pathname: ",pathname); 
  let path=router.asPath
  const id=path.split("/").pop()
  console.log("id: ",id)
  console.log("router.query.id",router.query.id)
  console.log("##################################################")



    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${id}`).then((response)=>{setdata(response.data)})
    },[id])

    const addToCarthandler=(event)=>{    //this will add item to cart and add style display:none to [add to cart] button
        event.preventDefault()
        setCart_count(1)
        console.log("test1 cart_count: ",cart_count)
        dispatch(
            addToCart(
                {id:data.id,value:Number(1)}
            )
        )
        ref_addtocart.current.style.display='none'
        ref_incdec.current.style.display='flex'
        
    }

    const addToCarthandlertwo=(val)=>{    //this will add item to cart and add style display:none to [add to cart] button

        if(Number(val)>0 & Number(val)<=999){
            setCart_count(Number(val))
            dispatch(
                addToCart(
                    {id:data.id,value:Number(val)}
                )
            )
        }
        else if(Number(val)===0){
            ref_addtocart.current.style.display='none'
            ref_incdec.current.style.display='flex'
        }
        else if(Number(val)<0 || Number(val)>999){
            window.alert("value should be between 0 to 999")
        }
        
    }
    const increment_handler=(event)=>{
        event.preventDefault()
        if(cartobject[data.id]<0||cartobject[data.id]>999){
            window.alert("value should be between 0 to 999")
        }
        else{
            if(cartobject[data.id]+1==1000){
                window.alert("value should be between 0 to 999")
            }
            else{
                setCart_count(cart_count+1)
                dispatch(
                    increment(
                        {
                            id:data.id,
                        }
                    )
                )
            }
            
        }
        
    }

    const decrement_handler=(event)=>{
        event.preventDefault()
        if(cartobject[data.id]<0||cartobject[data.id]>999){
            window.alert("value should be between 0 to 999")
        }
        else{
            if(cartobject[data.id]==0){
                ref_addtocart.current.style.display='block'
                ref_incdec.current.style.display='none'
            }
            else if(cartobject[data.id]==1){
                setCart_count(Number(cart_count)-1)
                dispatch(
                    decrement(
                        {
                            id:data.id
                        }
                    )
                )
                ref_addtocart.current.style.display='block'
                ref_incdec.current.style.display='none'
            }
            else{
                setCart_count(Number(cart_count)-1)
                dispatch(
                    decrement(
                        {
                            id:data.id,
                        }
                    )
                )
                
            }
        }
       

    }
console.log("cartobject:",cartobject)

    if (data.length!=0){
    
        return(
            // <div>"inside id.js"{router.query.id}</div>
            
                <div className={styles.productcard} key={data.id}>
                    <style jsx global>{`
                        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500&display=swap');
                        body {
                            margin: 0;
                            font-family: 'Plus Jakarta Sans';
                        }
                        `}
                    </style>
                    <div className={styles.productcard_imgdiv}>
                        <img className={styles.productcard_imgdiv_img} src={data.image}/>
                    </div>
                    <div className={styles.productcard_detaildiv}>
                        <div className={styles.productcard_detaildiv_category}>{data.category}</div>
                        <div className={styles.productcard_detaildiv_title}>{data.title}</div>

                        <div className={styles.productcard_priceratingdiv}>
                            <div className={styles.productcard_priceratingdiv_price}>RS.{data.price}</div>
                            <div className={styles.productcard_priceratingdiv_ratediv}>
                                <div className={styles.productcard_priceratingdiv_ratediv_title}>Rating({data.rating.rate})</div>
                                <div className={styles.productcard_priceratingdiv_ratediv_datadiv}>
                                    <div className={styles.productcard_priceratingdiv_ratediv_datadiv_rangedivmain}>
                                        <div className={styles.productcard_priceratingdiv_ratediv_datadiv_rangedivmain_range} style={{width:String(String((data.rating.rate/5)*100)+"%")}}></div>
                                        
                                    </div>
                                    <div className={styles.productcard_priceratingdiv_ratediv_datadiv_count}>{String(" "+String((data.rating.count)))}</div>
                                </div>
                                <div className={styles.productcard_priceratingdiv_ratediv_cartdiv}>
                                    {/* <Button className={styles.productcard_priceratingdiv_ratediv_cartdiv_button} onClick={(title==="Add to Cart")?addToCarthandler:removefrom_Carthandler}>{title}</Button> */}
                                    
                                </div>
                            </div>
                            <Button ref={ref_addtocart} style={cartobject[data.id]?{display:'none'}:{display:"block"}} onClick={(e)=>addToCarthandler(e)}>{title}</Button>
                            <div ref={ref_incdec} style={cartobject[data.id]?{display:'flex'}:{display:"none"}}>
                                {/* <Button onClick={(e)=>addToCarthandlertwo(e)}>{title}</Button> */}
                                <Button onClick={(e)=>decrement_handler(e)}>-</Button>
                                <Input ref={ref_inputbox} className={styles.carttitle} onChange={(e)=>addToCarthandlertwo(e.target.value)} value={cartobject[data.id]}/>
                                <Button onClick={(e)=>increment_handler(e) }>+</Button>
                            </div>
                        </div>

                        <div className={styles.productcard_detaildiv_textdiv}>
                            <div className={styles.productcard_detaildiv_textdiv_title}>Product detail</div>
                            <div className={styles.productcard_detaildiv_textdiv_text}>{data.description}</div>
                        </div>
                    </div>
                    
                    

                </div>
            
        )
    }
}