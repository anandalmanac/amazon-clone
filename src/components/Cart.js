import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import styled from 'styled-components';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { cart_total, item_decrement, item_increment, remove_from_cart,loadCurrentItem} from '../actions';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db,auth } from '../firebase';

function Cart() {
    const history=useHistory()
    const basket = useSelector(state => state.basket.items)
    const dispatch=useDispatch()
    console.log('basket is',basket)
    const data = useSelector(state => state.data.products);
    const user=useSelector(state=>state.data.user);
    console.log('data is',data)
    const[subTot,setSubTot]=useState(0)
    const[cartTot,setCartTot]=useState(0)


    useEffect(()=>{


        if(user){
            console.log('user is ',user.email)
        db.collection("users").doc(user.email).set({cart:basket}).then(
            console.log('basket added to db')
        )
        }
        var subtot=0;
        var carttot=0;
        const subtotal=()=>{
            basket.map((item)=>subtot+=item.price*item.qty)

        }
        const carttotal=()=>{
            basket.map((item)=>carttot+=item.qty)
        }
        subtotal();
        carttotal();
        setCartTot(carttot);
        setSubTot(Number(subtot).toFixed(2));

        

    },[basket])


    const handleCheckout=()=>{
        if(user){
            history.push("/checkout")

        }else{
            history.push("/login")
        }
    }
    





    return (
        <Container>
            <Items>
                
                <h2 className='cart-head'>Shopping Cart</h2>


                {basket.length>0?basket.map((item)=>
                    <Item>
                    <div className="details-wrap">
                        <div className="item-image">
                            <Link to={`/product/${item.id}`}>
                                <img src={item.image} alt=""  onClick={()=>console.log(dispatch(loadCurrentItem(item)))} />
                  
                            </Link>
                          </div>
                    <div className="item-details">
                        <h3>{item.title}</h3>
                        <div className="quantity">
                            <p>Quantity:{item.qty}</p>
                            <div className="counter">
                                
                                <ExpandLessIcon onClick={()=>dispatch(item_increment(item))}/>
                                <ExpandMoreIcon onClick={()=>dispatch(item_decrement(item))}/>
                                
                            </div>
                            
                        </div>
                        <p style={{color:'green'}}>price:${Number(item.price).toFixed(2)}</p>
                    
                    </div>
                    </div>
                    <div className="item-price">
                        <h2>${Number(item.price*item.qty).toFixed(2)}</h2>
                        <button onClick={()=>dispatch(remove_from_cart(item))}><DeleteIcon /></button>
                    </div>
                    
                </Item>
                ):
                <EmptyCart>
                    <h3>your cart is empty</h3>
                </EmptyCart>
                
                }
                

                
            </Items>
            {basket.length>0?
            <Checkout>
                <div className="top-banner">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
                </div>
                <div className="checkout-content">
                    <p>
Your order is eligible for FREE Delivery. Select this option at checkout. Details</p>
                    <h3>Subtotal ({cartTot} items):${subTot}</h3>
                    <div className="checkout-btn">
                        <button onClick={handleCheckout}>Proceed to Buy</button>
                    </div>
                </div>
            </Checkout>:null}
        </Container>
    )
}

export default Cart

const Container=styled.div`

display: flex;
padding: 80px 20px 0 20px;

@media(max-width:1020px){
    flex-direction: column;
    padding: 0;
    padding-top: 70px;
    
}

`
const Items=styled.div`
margin-right: 10px;
background-color:white;
padding: 20px;
width: 100vw;
.details-wrap{
    display: flex;
    flex:.75;
}

.cart-head{
    margin: 0;
    border-bottom: 1px solid lightgray;
}
@media(max-width:1020px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .cart-head{
        width: 100vw;
        padding-left: 20px;
    }

}
`

const Item=styled.div`
display:flex;
border-bottom: 1px solid lightgray;
padding: 20px 0px;
width: 75vw;
.item-image{
    display: flex;
    align-items: center;
}
img{
    height: 100px;
    width: 150px;
    object-fit: contain;
}
.item-details{
    padding: 20px;

}
.quantity{
    padding-top: 20px;
    display: flex;
    align-items: center;



    .counter{
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    *{font-size: 20px;
    padding:0;
    cursor: pointer;


}
}
}
.item-price{
    flex: .25;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 12px 22px;
    }
}

.subtotal{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

@media(max-width:1020px){
    padding: 0;
    padding-top: 10px;
    
    img{
        height:70px;
        width:70px;
        object-fit: contain;
    }
    .item-details{
    padding: 10px;
    h3{
        font-size: 16px;
    }

}
.quantity{
    



    .counter{
    display: flex;
    flex-direction: column;
    padding-left: 4px;
    *{font-size: 10px;
    


}
}
}
.item-price{
    h2{
        font-size: 18px;
    }
    button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 12px 22px;
    }
}


}
`

const Checkout=styled.div`
margin-left:10px;
@media(max-width:1020px){
    margin: 0px;
}
.top-banner{
    width:100%;
    margin-bottom: 10px;
    img{
        width: 100%;
        object-fit: cover;
    }
}
.checkout-content{
    background-color: white;
    padding: 20px;
    p{
        margin-bottom: 20px;
    }
    .checkout-btn{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        button{
            width: 100%;
            background-color: #FFAC31;
            border: none;
            outline: none;
            padding: 12px 40px;
            border-radius: 4px;
            cursor: pointer;
        }
    }
    
}

`
const EmptyCart=styled.div`
display: flex;
width: 75vw;
height: 200px;
h3{
    color: gray;
    padding-top: 10px;
}

`