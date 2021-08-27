import React from 'react'
import { useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory
} from "react-router-dom";
import Product from './Product';
import styled from 'styled-components'


function Search() {
    const [search, setSearch] = useState({})
    const data = useSelector(state => state.data.products);
    console.log('data search',data);
    const searchTerm=useSelector(state=>state.basket.searchTerm);
    const [display,setDisplay]=useState(false)

    useEffect(()=>{
        var search_data=data.filter((item)=>item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||item.category.toLowerCase().includes(searchTerm.toLowerCase()) )
        if(search_data.length>0){
            setDisplay(true)
            console.log('display true')
        }else{
            setDisplay(false)
            console.log('display false')
        }
console.log('search dummy is',search_data);
       // search_dummy.map((item)=>setSearch(search.concat(item)))
       setSearch({...search,search_data})
    },[searchTerm])
    
console.log('search is',search.search_data);

    return (
        <Container>
            {display?<p className='result-details'>found {search.search_data.length} results for the query '{searchTerm}'</p>:<p className='result-details'>no results found for the query '{searchTerm}'</p>}
            <ContainerWrap>
               

                {display?search.search_data.map((item)=>
                    
                    <Product key={item.id}
                    id={item.id}
                    description={item.description}
                     image= {item.image}
                     price= {item.price}
                    title={item.title}
                    category={item.category}
                    />):null
                    

            
        
        }
        

           </ContainerWrap>
            
        
            
        </Container>
    )
}

export default Search


const Container=styled.div`
margin-top: 0;

.result-details{
    padding-top: 70px;
    color: gray;
    padding-left: 10px;
    padding-bottom: 20px;
}
`
const ContainerWrap=styled.div`




display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit,minmax(350px,.2fr));


div{
    margin:10px;
    

}`