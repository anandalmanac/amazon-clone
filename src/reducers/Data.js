const DataReducer=(state={data:[]},action)=>{
    switch (action.type) {
        case 'GET_DATA':


            return {
                ...state,
                products:action.payload
            }
            case 'SET_USER':
                return {
                    ...state,
                    user:action.payload
                }

                
            
        
            
    
        default:
            return state;
            
    } 


}
export default DataReducer