var initState={
    token:localStorage.getItem('token'),
    user:[],
    message:""
}

const rootReducer =(state=initState,action)=>{
console.log(action.payload);
// //var currentColor = localStorage.getItem('token');
//console.log(currentColor);
switch(action.type){
    case "get": return {...state,user:action.payload};
    case "add":   localStorage.setItem('token',action.payload.token); return {...state,user:[action.payload.user],token:[action.payload.token],message:action.payload.message}
    case "login":localStorage.setItem('token',action.payload.token); return{...state,user:[action.payload.user],token:[action.payload.token],message:action.payload.message}
    case "clear": return{...state,message:[action.payload]}
    case "logout": localStorage.removeItem('token'); return{...state,user:[],message:"",token:null}
    default: return state;
}
}
export default rootReducer;