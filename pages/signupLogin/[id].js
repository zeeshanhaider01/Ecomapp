import React from "react";
import { useRouter } from "next/router";
import { useRef,useState } from "react";
import Link from 'next/link';
import styles from '../../styles/[id]signuplogin.module.css';
import {Form, FormGroup,Label,Input,Button} from 'reactstrap'

  
export default function Signup_Login(props){
    const router=useRouter()
    const [title,settitle]=useState(router.query.id)
    console.log("router.query.id",router.query.id)

    const [Username,setUsername]=useState("null")
    const [Password,setPassword]=useState("null")
    const [Status1,setStatus1]=useState("")
    const [Status2,setStatus2]=useState("")
    const refone=useRef("")
    const reftwo=useRef("")
    const onFinish = (e) => {
        e.preventDefault()
        let status=true

        if("Username: ",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Username)){
            console.log("Email is valid")
            setStatus1("")
        }
        else{
            setStatus1("Email is invalid")
            status=false
        }
        if("Password: ",/(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(Password)){
            console.log("Password is valid")
            setStatus2("")
        }
        else{
            setStatus2("Password is invalid")
            status=false
        }
        if(status){
            router.push('/')
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    
    return(
        <div className={styles.main}>
            {/* <div className={styles.title}>{title}</div> */}
            <Form onSubmit={onFinish}>
                <FormGroup>
                    <Label for="exampleEmail" hidden>
                    Email
                    </Label>
                    <Input id="exampleEmail" name="email" placeholder="Email" type="email" onChange={e=>setUsername(e.target.value)}/>
                    <Label ref={refone} style={Status1!=""?{display:'block',color:'red'}:{display:'none'}}>{Status1}</Label>
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input id="examplePassword" name="password" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
                    <Label ref={reftwo} style={Status2!=""?{display:'block',color:'red'}:{display:'none'}}>{Status2}</Label>
                </FormGroup>
                {' '}
                <Button>
                    {title}
                </Button>
            </Form>
        </div>
    )
}