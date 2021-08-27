import { SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch,useSelector } from 'react-redux';
import {useEffect, useState } from 'react';
import { clear_cart, search_data, set_user } from '../actions';
import fire from '../firebase';
import { db } from '../firebase';
import { add_to_cart } from '../actions';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function Header() {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket)

    const [cartCount, setCartCount] = useState(0);
    const[searchTerm,setSearchTerm]=useState('')
    const [disable, setDisable] = useState(true);
    const [clicked, setClicked] = useState(false);
    const history=useHistory();
    const [user,setUser]=useState(false);
    const[slide,setSlide]=useState(false);






const authListner=()=>{
    fire.auth().onAuthStateChanged((user)=>{
        if(user){
           
            setUser(user);
            history.push('/');
            console.log('user-details:',user.email);
            dispatch(set_user(user))
            
            

        }else{
            setUser('')
        }
    })
}
const handleLogOut=()=>{
    fire.auth().signOut().then(dispatch(clear_cart()));
    dispatch(set_user(null))

}

useEffect(()=>{
    authListner()


},[user])




    useEffect(() => {
        var count=0;
        basket.items.map((item)=>
        {
            
            count=count+item.qty;
            
            
        
        })

        setCartCount(count);
        
        
    }, [basket]);
    const searchItem=(e)=>{
        e.preventDefault()
        
        
        console.log('search for',searchTerm)
        
        dispatch(search_data(searchTerm))
        history.push(`/search/${searchTerm}`)
        setSearchTerm('');
       
    }

      window.addEventListener('keydown',(e)=>{
        if(e.code==='Enter'){
           //document.querySelector('button').click()
           setClicked(true)
        }
    })
    window.addEventListener('keyup',(e)=>{
        if(e.code==='Enter'){
           //document.querySelector('button').click()
           setClicked(false)
        }
    })
useEffect(() => {
    if(searchTerm===''){
        setDisable(true)

    }else{
        setDisable(false)
    }
    
}, [searchTerm]);
useEffect(() => {
    
    document.querySelector('#search_button').click()
    
}, [clicked])




useEffect(() => {

    let component=document.getElementById('slidenav')
    console.log('slide right',component.style.right)
    if(!slide){
        component.style.display='flex';
        component.style.right='-100vw';
        console.log('slide right')

    }else{
        console.log('slide left')
        component.style.right=0;
        component.style.display='flex';
    }
   
}, [slide]);








    
    return (
        <>
        <SlideNav id='slidenav'>
                <img src="./logo-black.png" alt="" />
                <div className="content" onClick={()=>setSlide(!slide)}>
                    {user?
                    <Link to="">Hello,{user.email}</Link>:<Link to="/login">Hello,Sign in</Link>

                    }
                    
                    <h4>Account & Lists</h4>
                    <Link to='/cart'>
                    <button>cart({cartCount})</button>
                    </Link>

                    {user?
                    <h4 style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</h4>:
                    <h4></h4>}
                </div>

            </SlideNav>
        <Container>
            
            <TopHeader>
                <Link to='/' className="logo">
                    <img src="./logo.png" alt="" />
                </Link>
                
            <Search>
                <input id='search_input' type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} /><button disabled={disable} id='search_button' onClick={searchItem}><SearchOutlined /> </button>
            </Search>
            <MenuIcon className='menu-icon' onClick={(e)=>{setSlide(!slide)}} />
            <Options>
                
                <Option>
                    {user?
                    <Link to="">Hello,{user.email}</Link>:<Link to="/login">Hello,Sign in</Link>

                    }
                    
                    <h4>Account & Lists</h4>
                </Option>
                <Option>
                    {user?
                    <ExitToAppIcon style={{cursor:'pointer',color:'white'}} onClick={handleLogOut}>Log Out</ExitToAppIcon>:
                    <h4></h4>}
                </Option>
                <Option className='cart'>
                    <Link to='/cart'>
                    <button><ShoppingCartOutlined /></button>
                    <h4>{cartCount}</h4>
                    
                    
                    </Link>
                    
                </Option>
            </Options>
            </TopHeader>
        </Container>
        </>
    )
}

export default Header


const SlideNav=styled.div`
background-color: white;
height:100vh;
position: fixed;
width: 100vw;
right: -100%;
padding: 12px;
display: none;
flex-direction: column;
justify-content:center;
z-index:10;
transition: all .3s ease-in-out;
img{
    height:30px;
    object-fit: contain;
    margin-bottom: 50px;
}
.content{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    *{
        margin: 3px;
        font-size: 13px;
    }
    button{
        background-color: transparent;
        outline:none;
        border: none;
        
    }
}

`





const Container=styled.div`
position: fixed;
width: 100%;
z-index: 1000;

`
const TopHeader=styled.div`
height:60px;
background-color: #131921;


.logo{
    flex:0.25;
    height:30px;
    display: flex;
    align-items: center;
   
}


img{
    height: 100%;
    object-fit: contain;
    width:auto;
     transition: transform .1s ease-in-out;
    &:hover{
        transform: scale(1.005);
    }
    @media (max-width:1020px){
        width: 50px;
    }
    
}

display: flex;
justify-content: space-between;
align-items: center;
padding: 0px 20px;


.menu-icon{
    color: white;
    display: none;
}
@media (max-width:1020px){
    
    .menu-icon{
        display: unset;
    }
}

`

const Search=styled.div`
flex:0.5;
display: flex;
align-items: center;

background-color: white;
transition: all .2s ease-in-out;




input{
    width:700px;
    outline:none;
    border: none;
    height: 30px;
    
    
}
button{
    width: 50px;
    height:30px;
    outline: none;
    border:none;
    background-color: #FFAC31;
    border-left:2px gray solid;
    
    *{
        color: black;
    }
}


@media (max-width:1020px){
    input{
        width: 45vw;
        height:15px;

    }
    button{
        height: 20px;
        *{font-size: 19px;}
        width: 30px;
    }
}

`
const Options=styled.div`
flex:.25;
display:flex;
align-items: center;
justify-content: flex-end;
h4{
    color:white;
    margin: 0px;
    font-size: 16px;
}
a{
    color:white;
    font-size: 13px;
}
.cart a{
    display: flex;
}
@media (max-width:1020px){
    display: none;
    button{
        display: flex !important;
    }
}

`
const Option=styled.div`
margin-left: 20px;

button{
    background-color: transparent;
    border:none;
    outline:none;
    color:white;
}
`

//55