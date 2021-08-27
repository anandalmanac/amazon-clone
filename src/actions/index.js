export const add_to_cart=(item)=>{

  
    return{
        type:'ADD_TO_CART',
        payload:item
        
    }
}
export const set_cart=(item)=>{

    return{
        type:'SET_CART',
        payload:item,
    }

}
export const remove_from_cart=(item)=>{
    return{
        type:'REMOVE_FROM_CART',
        payload:item
}
}


export const loadCurrentItem=(item)=>{
    return{
    type:'LOAD_CURRENT_ITEM',
    payload:item
    }

}



export const get_data=(data)=>{
    return{
        type:'GET_DATA',
        payload:data
        
    }
}
export const item_increment=(item)=>{
    return{
        type:'ITEM_INCREMENT',
        payload:item,
        
    }
}
export const item_decrement=(item)=>{
    return{
        type:'ITEM_DECREMENT',
        payload:item,
    }
}
export const cart_total=(items)=>{
    return{
        type:'CART_TOTAL',
        payload:items
    }
}
    export const search_data=(search)=>{
        return{
            type:'SEARCH_DATA',
            payload:search
        }
    }
export const set_user=(user)=>{
    return{
        type:'SET_USER',
        payload:user,
    }
}
export const clear_cart=()=>{
    return{
        type:'CLEAR_CART'
    }
}