import React from 'react'
import styled from 'styled-components'

function Offer({link}) {
    return (
        <Container>
            <Content>
                <h1>Everyday essentials</h1>
                <img src={link} alt="" />
            </Content>
            
        </Container>
    )
}

export default Offer


const Container=styled.div`
width: 100%;
height: auto;



border: 1px solid gray;
background-color: white;
overflow: hidden;

h1{
    align-self: flex-start;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
   
    
}


`
const Content=styled.div`
padding: 12px;


`