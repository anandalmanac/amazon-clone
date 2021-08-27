import { Label } from '@material-ui/icons'
import React from 'react'
import { useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import fire from '../firebase'


function Login() {
    const history=useHistory()
    const[user,setUser]=useState('')
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [emailError,setEmailError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [hasAccount,setHasAccount]=useState(true);


    const clearInputs=()=>{
        setEmail('')
        setPassword('')
    }
        const clearErrors=()=>{
        setEmailError('')
        setPasswordError('')
    }

const handleAccount=(e)=>{
    e.preventDefault();
    setHasAccount(!hasAccount);
    clearInputs();
    clearErrors();

}

const handleLogin=(e)=>{
    e.preventDefault()
    clearErrors()
    fire.auth().signInWithEmailAndPassword(email,password)
    .then(console.log('logged in'))
    .catch(err=>{
        switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found": 
                setEmailError(err.message);
                console.log(err.message)
                break;
            case "auth/wrong-password":
                setPasswordError(err.message);
                console.log(err.message);
                break;
        }
    })

}
const handleSignUp=(e)=>{
    e.preventDefault()
    clearErrors()
    fire.auth().createUserWithEmailAndPassword(email,password)
    .catch(err=>{
        switch(err.code){
            case "auth/email-already-in-use":

            case "auth/invalid-email": 
                setEmailError(err.message);
                console.log(err.message)
                break;
            case "auth/weak-password":
                setPasswordError(err.message);
                console.log(err.message)
                break;
        }
    })

}
const handleLogOut=()=>{
    fire.auth().signOut();
}
const authListner=()=>{
    fire.auth().onAuthStateChanged((user)=>{
        if(user){
            clearInputs()
            setUser(user);
            history.push('/')
            

        }else{
            setUser('')
        }
    })
}
useEffect(() => {

    authListner();

}, [])

    return (
        <Container>
            <img src="./logo-black.png" alt="" />
            <Content>
                {hasAccount?
                <form action="">
                    <label htmlFor="">Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <p className='error'>{emailError}</p>

                    <label>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <p className='error'>{passwordError}</p>
                    <button onClick={(e)=>handleLogin(e)}>Sign-In</button>

                    
                    <p>New to amazon?<span onClick={(e)=>handleAccount(e)} style={{color:'blue',cursor:'pointer'}}>register</span></p>
                    
                </form>:
                <form action="">
                    <label htmlFor="">Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <p className='error'>{emailError}</p>

                    <label>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <p className='error'>{passwordError}</p>
                    <button onClick={handleSignUp}>Sign-Up</button>

                    <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                    <p>Already a member?<span onClick={(e)=>handleAccount(e)} style={{color:'blue',cursor:'pointer'}}>login</span></p>
                    
                </form>}
            </Content>
            
        </Container>
    )
}

export default Login
const Container=styled.div`
flex-direction: column;
padding-top: 70px;
display: flex;

align-items: center;
min-height: 100vh;

img{
    
    height: 40px;
    margin-bottom: 30px;
}

`

const Content=styled.div`
width: 400px;

background-color: white;
border: lightgray 1px solid;
border-radius: 4px;
display: flex;
flex-direction:column;
justify-content: center;
padding: 50px;

form{
    display: flex;
    flex-direction: column;
    input,button{
        padding: 6px 6px;
    }
    button{
        margin-top: 30px;
        background-color: #FF9900;
        outline: none;
        border: none;
        padding: 12px 6px;
        border-radius: 4px;
        cursor: pointer;
    }
    label{
        padding-top: 12px;
    }
    p{
        margin-top: 10px;
    }
    .error{
        color: red;
    }
}
@media(max-width:1020px){
    width: 90%;
    padding: 25px;
}

`