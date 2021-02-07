import React, {useReducer} from "react";


export default (reducer, action, initialState) => {
const Context = React.createContext();

const Provider = ({children}) => {
 const [state, dispatch] = useReducer(reducer, initialState);

 const BoundActions ={};

 for(let key in action){
    BoundActions[key] =  action[key](dispatch);
}

return (
  <Context.Provider value = {{state, ...BoundActions}}>
    { children}
  </Context.Provider> );

}



return {Context, Provider};
}