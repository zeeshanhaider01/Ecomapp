import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import ProductCard from './productCard.js'
import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import Productdata from './productdata.js';
import store from './store.js';
import { Provider, useSelector } from 'react-redux';
import Cartcount from './cart';
import Link from 'next/link';
import Foo from './product/[id]';
import Indexfoo from './product';
import Signup_Login from './signupLogin/[id]';
import 'bootstrap/dist/css/bootstrap.min.css';
const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const id=1
  let baseURL='https://fakestoreapi.com/products'
  const [data,setdata]=useState(Productdata)
  
  let caturl='https://fakestoreapi.com/products/categories'
  const [categorydata,setcategorydata]=useState([])
  useEffect(()=>{
    axios.get(caturl).then((response)=>{setcategorydata(response.data)})
  },[])
  // axios.get(caturl).then((response)=>{setcategorydata(response.data)}) 
  //without useEffect(()=>{},[]) the code line of fetching data with axios was creating infinte loop 
  //because after every render the axios was being called and that was updating the state and when the 
  //state gets update the render is due and after every render the axios was called that update the state 
  //again axios alone without useEffect(callback,[]) create infinite loop to avoid this use 
  //useEffect(callback,[]) callback with empty array

  const clickhandler=subpath=>{
    if (subpath==='https://fakestoreapi.com/products'){
      setdata(Productdata)
    }
    else{
      let url=baseURL+"/category/"+subpath
      axios.get(url).then((response)=>{setdata(response.data)})
    }
    
  }

  return (
      <>
        <Layout className={styles.home}>
        <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500&display=swap');
              body {
                margin: 0;
                font-family: 'Plus Jakarta Sans';
              }
            `}</style>
          <Sider
              theme='light'
              breakpoint="lg"
              collapsedWidth="0"
              collapsedheight={10}
              width={150}
              style={{background:'transparent',height:'auto'}}
              className={styles.sider}
          >
            <div className="logo" />
            <Menu style={{height:'100vh'}}>
              <Menu.Item key={"1"} type="button"onClick={e=>clickhandler('https://fakestoreapi.com/products')}>All products</Menu.Item>
              {categorydata.map((title,indx)=><Menu.Item key={indx+2} onClick={e=>clickhandler(title)}>{title}</Menu.Item>)}
            </Menu>
          </Sider>
          <Layout className={styles.Layout}>
            <Header
              style={{
                padding: 0,
                background: "lightblue",
              }}
            >
              <div>
                <div className={styles.signupLogindiv}>
                  <Link href={`/signupLogin/${'signup'}`}><Button>signup</Button></Link>
                  <Link href={`/signupLogin/${'login'}`} ><Button>login</Button></Link>
                </div>
                <Cartcount/>
              </div>
            </Header>
            <Content className={styles.container}>
              <div className={styles.content}>
                {data.map((item,idx)=><Link href={`/product/${Number(item.id)}`}><ProductCard key={idx} id={item.id} image={item.image} category={item.category} title={item.title} 
            description={item.description} price={item.price} rate={item.rating.rate} count={item.rating.count}/></Link>)}
              </div>
            </Content>
          </Layout>
        </Layout>
        {/* <Link href={`/signupLogin/${'signup'}`} >signup</Link>
        <Link href={`/signupLogin/${'login'}`} >login</Link> */}
      </>
  )
}
