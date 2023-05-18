import React,{useState} from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import styles from '../../styles/[id]signuplogin.module.css';
import { Button, Checkbox, Form, Input } from 'antd';

  
export default function Signup_Login(props){
    const router=useRouter()
    const [title,settitle]=useState(router.query.id)
    console.log("router.query.id",router.query.id)

    const [Username,setUsername]=useState("null")
    const [Password,setPassword]=useState("null")
    const onFinish = (values) => {
        setUsername(values.username)
        setPassword(values.password)
        if("Username: ",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Username)){
            console.log("Email is valid")
        }
        else{
            window.alert("Email is invalid")
        }
        if("Password: ",/(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(Password)){
            console.log("Password is valid")
        }
        else{
            window.alert("Password is invalid")
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    
    return(
        <div className={styles.main}>
            {/* <div className={styles.title}>{title}</div> */}
            <Form 
                name="basic"
                labelCol={{span: 8,}}
                wrapperCol={{span: 16,}}
                style={{maxWidth: 600,}}
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.form}
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                onChange={(e)=>setUsername(e.target.value)}
                >
                <Input onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                onChange={(e)=>setPassword(e.target.value)}
                >
                <Input.Password onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item style={title=="signup"?{display:'none'}:{display:'block'}}
                name="remember"
                valuePropName="checked"
                wrapperCol={{offset: 8,span: 16,}}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit" >
                    {title}
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}