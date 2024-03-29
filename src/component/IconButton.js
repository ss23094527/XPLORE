import { Text, View ,TouchableOpacity,Image,StyleSheet} from 'react-native'
import React, { Component } from 'react'

const IconButton=({icon,onPress})=>{
        return(
            <TouchableOpacity 
                style={styles.container} 
                onPress={onPress}
            >
                <Image 
                 source={icon}
                 resizeMode="contain"
                 style={styles.icon}
                >
                   
                </Image>





            </TouchableOpacity>


        )

}

export default IconButton;

const styles = StyleSheet.create({
    container: {
      position: 'relative',
     
      flex:'1',
    },
    icon:{
        width:30,
        height:30,
        tintColor:"white",
    }
});