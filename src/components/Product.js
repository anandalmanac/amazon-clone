import React from 'react'
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux'
import {add_to_basket, add_to_cart, item_decrement, item_increment, loadCurrentItem} from '../actions/index'
import { Link } from 'react-router-dom';
import { MicNone } from '@material-ui/icons';

function Product({id,image,title,description,price,category}) {
   const dispatch = useDispatch();
   const basket = useSelector(state => state.basket.items)



    return (
        
        <Container>
            
            
                <>
                <h3  className="product_name">
                    {title}
                </h3 >
                <div className="product_price">
                    <h3 style={{fontWeight:"bold",}}>Price:<span style={{color:'green'}}>${price}</span></h3>
                </div>
                </>
                <div className="product_img">
                    <Link to={`/product/${id}`} style={{textDecoration:'none',color:'black'}}>
                    <img src={image} alt="" onClick={()=> dispatch(loadCurrentItem({id,title,price,image,description,category}))}/></Link>
                
                </div>
                <button onClick={()=> dispatch(add_to_cart({id,title,price,image,description}))}>Add to basket</button>
                   
  
        </Container>
       
    )
}

export default Product


const Container=styled.div`

background-color:white;
display: flex;
flex-direction: column;
justify-content: space-between;


padding: 20px;
margin: 10px;
*{
    margin: 0;
}
@media(max-width:1020px){
    h3{
        font-size: 13px;
    }
    margin: 3px;
    padding: 10px;
   
}

.rating{
    display: flex;
}
.product_img a{
    
    width: 100%;
    object-fit: contain;
    display: flex;
    justify-content: center;
    img{
        
        width: 80%;
        max-height: 200px;
        object-fit: contain;
    }

   @media(max-width:1020px){
       img{
           padding-top:20px;
       }
   }

}
.product_name{
    width: 80%;
}
 button{
        background-color: #FFAC31;
        color: black;
        padding: 12px 10px;
        width: 200px;
        align-self: center;
        outline: none;
        border: none;
        cursor: pointer;
        margin-top: 20px;
       
       

    }   

    @media(max-width:1020px){
        button{
            width: 110px;
            font-size: 10px;
            padding: 8px 10px;
        }
    }
`

const ProductInfo=styled.div``