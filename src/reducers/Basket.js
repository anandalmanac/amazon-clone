
function BasketReducer(state={items:[],currentItem:null,searchItems:null,searchTerm:null},action){
    switch(action.type){
        case 'SET_CART':
            return{
                ...state,
                items:[...state.items,action.payload]

            }

        case 'ADD_TO_CART':
            

            const inCart=state.items.find((item)=>item.id===action.payload.id?true:false);
            //CHECK IF ITEM IN THE CART
            return{
                ...state,
                items:inCart?state.items.map((item)=>item.id===action.payload.id?
                {...item,qty:item.qty+1}:item)
                :[...state.items,{...action.payload,qty:1}]

            }
        case 'REMOVE_FROM_CART':
            return{
                ...state,
                items:state.items.filter((item)=>item.id!==action.payload.id)

            }
            case 'ITEM_INCREMENT':
                return{
                    ...state,
                    items:state.items.map((item)=>item.id===action.payload.id?
                    {...item,qty:item.qty+1}:item)
                }
            
            case 'ITEM_DECREMENT':
                return{
                    ...state,
                    items:state.items.map((item)=>item.id===action.payload.id?item.qty>1?
                    {...item,qty:item.qty-1}:item:item)
                }
            case 'CART_TOTAL':
                 var count=0;
                 console.log(action.payload)
                action.payload.map((item)=>
                {
                    
                    count=count+item.qty;
                    
                    
                
                })
            

                
                return count;

            case 'LOAD_CURRENT_ITEM':
                const item=state.items.find((item)=>item.id===action.payload.id?true:false);
                return {
                    ...state,
                    currentItem:action.payload
                }
            case 'SEARCH_DATA':
                console.log('clicked')
                if(action.payload.search!==''){
                    state.items.map((item)=>console.log(item.title))
                    console.log(state.items.filter((item)=>item.title.toLowerCase().includes('fj')))
                    return{
                    ...state,
                    searchTerm:action.payload,
                    searchItems:state.items.filter((item)=>item.title.toLowerCase().includes(action.payload.toLowerCase()))
                }
                }
                case 'CLEAR_CART':
                    return{
                        ...state,
                        items:[]
                    }
                
                
            default:
                return state;
    }
}

export default BasketReducer;