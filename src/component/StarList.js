import React from "react";
import { StyleSheet, View, Image } from "react-native";

const StarList = ({stars}) => {
  let starList = [];

  for(let i=1;i<=5;i++){
    if (stars>=i){
      starList.push(<Image source={require('../../assets/images/ic_round-star.png')} style={styles.stars} key={i}/>)
    } else {
      starList.push(<Image source={require('../../assets/images/ic_line-star .png')} style={styles.stars} key={i}/>)
    }
  }

  return (
    <View style={styles.starList}>
      {starList}
    </View>
  );  
};

const styles = StyleSheet.create({
  starList: {
    flexDirection: "row"
  },
  stars: {
    width:12,
    height:15,
    marginRight: 4
  }
})
export default StarList;