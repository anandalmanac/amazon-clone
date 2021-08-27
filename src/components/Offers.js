import React from 'react'
import Offer from './Offer'
import styled from 'styled-components'

function Offers() {
    return (
        <Container>
            <Offer link={'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/02/jio-phone-offer-1614351851.jpg'}/>
            <Offer link={'https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2020/01/amazon-great-indian-sale.jpg'} />
            <Offer link={'https://i.ytimg.com/vi/8pYcJSZ3Zvs/maxresdefault.jpg'} />
            <Offer link={'https://img1.gadgetsnow.com/gd/imgbn/Amazon-Cash-Back.jpg'}/>
            <Offer link={'https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2020/01/amazon-great-indian-sale.jpg'} />
            <Offer link={'https://i.ytimg.com/vi/8pYcJSZ3Zvs/maxresdefault.jpg'} />
            
        </Container>
    )
}

export default Offers


const Container=styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(auto-fit,minmax(400px,1fr));
grid-column-gap: 16px;
grid-row-gap: 16px;
margin: 30px;


`