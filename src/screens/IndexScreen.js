import React, {useContext, useEffect} from "react";
import {Text, View, StyleSheet, FlatList, Button, TouchableOpacity} from "react-native";
import {Context} from "../context/BlogContext"
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
  const {state, addBlogPost, deleteBlogPost, getBlogPost} = useContext(Context);

  useEffect(()=>{
    getBlogPost();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPost();
    })

    return () => {
      listener.remove();
    }
  }, []);

  
 return (
    <View>
      
      <Button title="Add Post" onPress={() => addBlogPost()}/>

      <FlatList
      data={state}
      keyExtractor={(blogPost) => blogPost.id.toString()} //keys must be string values to prevent the error.
      renderItem={({item}) => {
        return(
          <TouchableOpacity onPress={() => navigation.navigate("Show", { id : item.id })}>
          <View style={styles.row}>
          <Text style={styles.title}>{item.title} - {item.id}</Text>
          <TouchableOpacity  onPress={() => deleteBlogPost(item.id)} >
            <EvilIcons name="trash" size={26} color="black" />
          </TouchableOpacity>
          
          </View>
         </TouchableOpacity>

        );
      }}
      />
     
    </View>
  )

 
}

IndexScreen.navigationOptions = ({navigation}) => {
   return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
       <AntDesign name="pluscircle" size={24} color="black" />
      </TouchableOpacity>
    ),
  };
}

 const styles = StyleSheet.create({
    row : {
      flexDirection : "row",
      justifyContent : "space-between",
      paddingVertical : 20,
      paddingHorizontal : 10,
      borderTopWidth : 1,
      borderColor : "blue"

    },
    title : {
      fontSize : 18,
      fontWeight : 'bold'
    }

  })

export default IndexScreen;


