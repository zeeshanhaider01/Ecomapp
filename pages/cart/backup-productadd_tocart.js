import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/productsadd_tocart.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromCart,increment,decrement, cartobj } from "../slice";
import {input, Form} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { Button, Input } from "antd";
import axios from "axios";

export default function Cart(){
    const cart=useSelector(cartobj)
    console.log("cart: ",cart)
    const [data,setdata]=useState([])
    const dispatch=useDispatch()
    const ids=Object.keys(cart)

    const [paymethod,setpaymethod]=useState("")
    const [CardNumber,setCardNumber]=useState("")
    const [Date,setDate]=useState("")
    const [Cvv,setCvv]=useState("")
    const checkoutbtn=useRef(null)

    useEffect(()=>{axios.get(`https://fakestoreapi.com/products`).then((response)=>setdata(response.data))},[])

    const entire_products={}
    data.forEach((item)=>{
        entire_products[item.id]={...item}
    })
    const obj_cart={}
    console.log("entire_products: ",entire_products)
    if(Object.keys(entire_products).length!==0){
        ids.forEach((id)=>
            {
                let single_product={}
                single_product["image"]=entire_products[String(id)].image
                single_product["total_price"]=(entire_products[String(id)].price)*cart[id]
                obj_cart[id]={...single_product}
            }
        )
    }
    
    const increment_handler=(event,id)=>{
        event.preventDefault()
        if(cart[id]<0||cart[id]>999){
            window.alert("value should be between 0 to 999")
        }
        else{
            if(cart[id]+1==1000){
                window.alert("value should be between 0 to 999")
            }
            else{
                dispatch(
                    increment(
                        {
                            id:id,
                        }
                    )
                )
            }
            
        }
        
    }

    const decrement_handler=(e,id)=>{
        e.preventDefault()
        if(cart[id]<0||cart[id]>999){
            window.alert("value should be between 0 to 999")
        }
        else{
            if(cart[id]==0){
            }
            else if(cart[id]==1){
                dispatch(
                    decrement(
                        {
                            id:id,
                        }
                    )
                )
            }
            else{
                dispatch(
                    decrement(
                        {
                            id:id,
                        }
                    )
                )
                
            }
        }
       

    }

    const net_price=()=>{
        let ids=Object.keys(cart)
        let sum=0
        ids.map((id)=>{
            sum+=obj_cart[id].total_price
        })
        return sum.toFixed(2)

    }

    if(Object.keys(cart).length!==0 && paymethod!=="" && /(^\d{14}$)/.test(CardNumber)==true && Date!=="" && /(^\d{3}$)/.test(Cvv)==true){
        checkoutbtn.current.style.display="block"
    }
    else{
        if(checkoutbtn.current!==null){
            checkoutbtn.current.style.display="none"
        }
    }

    console.log("obj_cart: ",obj_cart)
    if(Object.keys(obj_cart).length!==0){
        return(
            <div>
                <div className={styles.cartPricemainContainer}>
                    <div className={styles.cartcontainerdiv}>{ids.map((id)=>
                        <div className={styles.cartContainerdiv_cartItemdiv}>
                            <div className={styles.cartContainerdiv_cartItemdiv_imgdiv}>
                                <img style={{height:"300px",width:"auto"}} src={obj_cart[id].image}/>
                            </div>
                            <div className={styles.cartContainerdiv_cartItemdiv_pricediv}>{obj_cart[id].total_price.toFixed(2)}</div>
                            <div className={styles.cartContainerdiv_cartItemdiv_addremovecartdiv}>
                                <div className={styles.cartContainerdiv_cartItemdiv_addremovecartdiv_counterbtndiv}>
                                    <Button onClick={(e)=>decrement_handler(e,id)}>-</Button>
                                        <Input className={styles.carttitle} value={cart[id]}/>
                                    <Button onClick={(e)=>increment_handler(e,id) }>+</Button>
                                </div>
                                <div className={styles.cartContainerdiv_cartItemdiv_addremovecartdiv_removebtn}>
                                    <Button onClick={e=>dispatch(removefromCart({id:id}))}>X</Button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <div className={styles.cartPricemainContainer_netPricediv}>total: {net_price()}</div>
                </div>

                <Form>
                    <div class="form-check">
                        <input onChange={e=>setpaymethod(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" required/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paypal" viewBox="0 0 16 16">
                                <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z"/>
                            </svg>
                            Credit Card
                        </label>
                    </div>
                    <div class="form-check">
                        <input  onChange={e=>setpaymethod(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" required/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                            </svg>
                            Paypal
                        </label>
                    </div>

                    <form>
                        <div class="mb-3">
                            <label>Card Number:</label>
                            <input type="password"  onChange={e=>setCardNumber(e.target.value)} minLength={"14"} maxLength={"14"} placeholder="enter 14 digits" required/>
                        </div>

                        <label>
                            Expiration Date
                            <input
                            type="date"
                            name="party"
                            min=""
                            max=""
                            onChange={e=>setDate(e.target.value)}
                            required />
                            <label>
                            CVV:
                            <input type="password" onChange={e=>setCvv(e.target.value)} minLength={"3"} maxLength={"3"} required/>
                            </label>
                        </label><br></br>  
                        {/* <div className={styles}>
                            <label for="exampleInputPassword1" class="form-label">CVV:</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                        </div> */}

                        

                        <button ref={checkoutbtn} style={{display:"none"}} type="submit" class="btn btn-primary">Check Out</button>
                    </form>
                </Form>

            </div>
        )
    }
    else if(Object.keys(cart).length==0){
        return(
            <div>The Cart is empty

                <div class="container-fluid">
                    <h1>Hello World!</h1>
                    <p>Resize the browser window to see the effect.</p>
                    <div class="row">
                        <div class="col-10" style={{backgroundColor:"green"}}>.col-xs-9 </div>
                        <div class="col-2" style={{backgroundColor:"blue"}}>.col-xs-3 </div>
                    </div>
                    {/* <div class="row">
                        <div class="col-xs-6 col-md-10" >.col-xs-6 .col-md-10</div>
                        <div class="col-xs-6 col-md-2" >.col-xs-6 .col-md-2</div>
                    </div>
                    <div class="row" >
                        <div class="col-xs-6">.col-xs-6</div>
                        <div class="col-xs-6">.col-xs-6</div>
                    </div> */}
                    {/*<div class="row">
                        <div class="col-8">this is 8 in size</div>
                        <div class="col-4">this is 4 in size</div>
                    </div>*/}
                </div>

            </div>
            
        )
        
    }
    
}