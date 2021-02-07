import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues}) => {
     const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (

        <View>
        <Text style={styles.text} >Enter Title</Text>
        <TextInput style = {styles.label} value={title} onChangeText={(text) => setTitle(text) }></TextInput>
        <Text style={styles.text} >Enter Content</Text>
        <TextInput style = {styles.label} value={content} onChangeText={(text)=> setContent(text)}></TextInput>
        <Button title='Save' onPress={() => onSubmit(title, content )}  />
        </View>

    );

   

 
    }



BlogPostForm.defaultProps = {
        initialValues : {
            title : '',
            content :''
        }
}  


   
const styles = StyleSheet.create({
    text :{
        margin : 10,
        fontWeight : 'bold',
        color : "orange",
         fontSize : 15
    },

    label : {
        margin : 10,
        marginBottom : 15,
        borderWidth : 2,
        padding : 5,
        borderRadius : 15,
        paddingLeft : 7,
        borderColor : "blue"

    }
})

export default BlogPostForm;