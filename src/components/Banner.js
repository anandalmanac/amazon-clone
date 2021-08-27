import React from 'react'
import styled from 'styled-components'

function Banner() {
    return (
        <Container>
            <img src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png" alt="" />
        </Container>
    )
}

export default Banner


const Container=styled.div`
height: 400px;
width: 100%;
margin: 20px 0px 20px 0px;

img{
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center;
}

@media(max-width:1020px){
    height:100px;
    margin: 0;
    img{
        height:100px;
    }
}
    

`