
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import { useState } from 'react';
import { useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import {get_data, set_cart} from './actions/index';
import CurrentItem from './components/CurrentItem';
import Search from './components/Search';
import Login from './components/Login';
import { db } from './firebase';
import { add_to_cart } from './actions/index';
import Checkout from './components/Checkout';


function App() {
  const user = useSelector(state => state.data.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setData(json))

      /*  if(user){
        db.collection("users").doc(user.email).get()
    .then((doc)=>{
        if(doc.exists){
            console.log('cart_db is',doc.data());
            var cart_db=doc.data().cart
            cart_db.map((item)=>{
                dispatch(add_to_cart(item));
            })
        }
    })
    }*/
     
  }, [])
  //initial loading of cart

useEffect(() => {
 
      if(user){
        db.collection("users").doc(user.email).get()
    .then((doc)=>{
        if(doc.exists){
            console.log('cart_db is',doc.data());
            var cart_db=doc.data().cart
            cart_db.map((item)=>{
                dispatch(set_cart(item));
            })
            console.log('initial_db added')
        }
    })
    }
     
    }, [user]);








  console.log(data)
  const history=useHistory();
   const dispatch = useDispatch();
    dispatch(get_data(data))
    const currentItem = useSelector(state => state.basket.currentItem)
    const basket = useSelector(state => state.basket)
    console.log('search item is',basket.searchItems)






    
  return (
    <Router>
    <div className="App">
      
    
        <Switch>
         
          <Route path="/cart">
            <Header />
            <Cart />
          </Route>
          <Route path={currentItem!==null?`/product/${currentItem.id}`:'/product'}>
            <Header />
            <CurrentItem item={currentItem}/>
          </Route>

          <Route path={basket.searchTerm!==null?`/search/${basket.searchTerm}`:'/xy'}>
            <Header />
            <Search item={basket.searchItems}/>
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          {user?
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>:null}
          
           <Route path="/">
             <Header />
            <Home />
          </Route>
        </Switch>
    
      


    </div>
    </Router>
  );
}

export default App;
