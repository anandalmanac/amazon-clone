import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './Product';
import Offers from './Offers';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { id } from 'postcss-selector-parser';
import { db } from '../firebase';
import { add_to_cart } from '../actions';
import { useState } from 'react';

    

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  }

db.collection('users').onSnapshot(snapshot=>{
    snapshot.docs.map((user)=>console.log(user.data()))
    //setCart({id:user.id,cart:user.data()})
    //set this id as key
})



function Home() {
    const[cart_db,setCart_db]=useState()
    const dispatch=useDispatch()
    const data = useSelector(state => state.data.products);
    const user = useSelector(state => state.data.user);
    console.log('data is',data)


       
    const searchTerm=useSelector(state=>state.basket.searchTerm);
    console.log('searchterm is',searchTerm)
    const currentItem = useSelector(state => state.basket.currentItem)





const history=useHistory();
useEffect(() => {
  if(searchTerm===null){
    console.log('null basket',history)
    history.push("/")
    

    }else if(currentItem===null){

        history.push("/")
    }
    
  }, [searchTerm]);


    
   
    return (
        <div>
            <Container>
                <Slider {...settings} className='slider'>
                    <div><img className='home_image' src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/June/Headsets/realmeBudsq2/GoLive/Approved/D25129837_WL_realme_Buds_Q2_Go-live_Tall_Hero_1500x600._CB665768527_.jpg" alt="" />
                        </div>
                         <div><img className='home_image' src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/OPPO/BAU/GW/V348719848_IN_WLD_OPPO_A74_TallHero_1500x600._CB665915303_.jpg" alt="" />
                        </div>
                         <div><img className='home_image' src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/June/M21/Hin/1500x600_Hero-Tall_JPN._CB664880312_.jpg" alt="" />
                        </div>

                </Slider>
               <div className="content_wrap">
                <Content >

                    

                   <ProductsWrap>
                       {data.map((data)=>
                           <Product 
                    id={data.id}
                    description={data.description}
                     image= {data.image}
                     price= {data.price}
                    title={data.title}
                    category={data.category}
                    />
                    




                       )}
                   </ProductsWrap>

                   
                   <Banner />
                  
                 
                
               </Content>
               
              
               </div>
              
            </Container>
        </div>
    )
}

export default Home

const Container=styled.div`
padding-top: 60px;


.slider{
    height: calc(100vh - 50px);
    div{
    outline: none;
}
}
.home_image{
    
    width: 100%;
    height: calc(100vh - 60px);
    object-fit: cover;
    z-index:-1;
   
    mask-image: linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,0));
}

.slick-arrow{
    z-index:2;

    margin-left: 50px;
    margin-right: 50px;
    
    transform: translateY(-200px);
}
.content_wrap{
    width: 100%;
    display: flex;
    justify-content: center;
}
@media(max-width:1020px){
    .slider{
    height:100vh;
    div{
    outline: none;
}
}
.home_image{
    
    width: 100%;
    height: 300px;
    object-fit: cover;
    z-index:-1;
   
    mask-image: linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,0));
}

.slick-arrow{
    z-index:2;

    margin-left: 50px;
    margin-right: 50px;
    
    position: absolute;
    top: 250px;
}
.content_wrap{
    width: 100%;
    display: flex;
    justify-content: center;
}
}
`
const Content=styled.div`
position: absolute;
top: 50vh;
width: 100%;
max-width: 1400px;
@media(max-width:1020px){
    top: 200px;
}


`
const OffersWrap=styled.div`
width: 100%;
display: flex;
justify-content: center;


`
const ProductsWrap=styled.div`

display: grid;
grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
@media(max-width:1020px){
    grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
}

`