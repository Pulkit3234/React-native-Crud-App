import React, {useReducer} from "react"
import createDataContext from "./createDataContext"
import jsonserver from '../api/jsonserver'




const blogReducer = (state, action) => {
    switch(action.type) {
       /* case "add_blogpost":
        return [...state, {id : Math.floor(Math.random()*99999), title : action.payload.title, content : action.payload.content}]; */
        case "delete_post":
            return state.filter((post)=> action.payload!==post.id);
        case "edit_post" :
            return state.map(post => {
                return post.id === action.payload.id ? action.payload : post ;
            })
            case 'get_blogpost':
                return action.payload;
         default :
         return state;
    }

}

const getBlogPost = (dispatch) => {
    return async () => {
        const response = await jsonserver.get('/blogposts');
         
        dispatch({type : 'get_blogpost', payload : response.data});
    }
}


const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonserver.post('/blogposts', {title, content})
        if(callback){
          callback();
        }
       
    };
};
    
const deleteBlogPost = (dispatch) => {
    return(
        async(id) => {
            await jsonserver.delete(`blogposts/${id}`);
            dispatch({type: "delete_post", payload : id});
        }

    );
}

const editBlogPost = (dispatch) => {
    return async (title, content, id, callback) => {
        await jsonserver.put(`blogposts/${id}`, {title, content, id} );

         dispatch({type : 'edit_post', payload : {title, content, id}});
         if (callback) {
             callback();
         }
     }

    
}

 
    

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPost}, []);
    
