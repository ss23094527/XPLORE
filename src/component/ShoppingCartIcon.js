// ShoppingCartIcon.js

import React from 'react';
import { TouchableOpacity ,StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

const ShoppingCartIcon = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.cart} onPress={onPress}>
      <MaterialIcons name="shopping-cart" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default ShoppingCartIcon;


const styles = StyleSheet.create({
    cart: {
    marginLeft: 20 ,
     marginRight: 20 ,
     marginTop:50,
    
    },
});  