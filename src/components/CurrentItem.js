import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { add_to_cart } from '../actions'
import { useHistory } from 'react-router'




function CurrentItem(props) {
    const dispatch=useDispatch()
    const data = useSelector(state => state.data.products);
   
        
       
       
  
    

    var item=props.item
    const currentItem = useSelector(state => state.basket.currentItem)


const history=useHistory();
useEffect(() => {
  if(item===null){

        history.push("/")
    }
    
  }, [item]);



    console.log(item)
    
    return (
        
        <Container>
            {item!==null?
            <>
            
            <ContainerWrap>
                <LeftContainer>
                <img src={item.image} alt="" />
            </LeftContainer>
            <RightContainer>
                <h1>{item.title}</h1>
                <h3>{item.description}</h3>
                <h1>Price:₹{item.price}</h1>
                <button onClick={()=> dispatch(add_to_cart(item))}>add to cart</button>


            </RightContainer>

            </ContainerWrap>
            <div className="suggestions">
               
            </div></>:null}
            
           
        </Container>
    )
}

export default CurrentItem


const Container=styled.div`
padding-top: 50px;

display:flex;
justify-content: center;
background-color: white;
align-items: center;
min-height: 100vh;
`
const ContainerWrap=styled.div`
width:70vw;
display: flex;
height: 100%;
align-items: center;
padding: 50px;
justify-content: space-between;
@media(max-width:1020px){
    width: 90%;

    flex-direction: column;
    padding: 10px;
}


`

const LeftContainer=styled.div`
flex: 0.5;
margin-right: 20px;
img{
    height: 500px;
    width: 500px;
    object-fit: contain;
}
@media(max-width:1020px){
    img{
        height: 300px;
        width:300px;
    }
}
`

const RightContainer=styled.div`
flex:.5;
margin-left: 20px;
button{
    cursor: pointer;
    margin-top: 50px;
    width: 100%;
    background-color: orange;
    padding: 12px 40px;
    outline:none;
    border: none;
}
@media(max-width:1020px){
   
    h1{
        font-size: 18px;
    }
    h3{
        font-size: 13px;
    }
}

`

