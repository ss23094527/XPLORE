import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelIcon, setShowCancelIcon] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setShowCancelIcon(text.length > 0);
  };

  const handleCancel = () => {
    setSearchQuery('');
    setShowCancelIcon(false);
  };

  return (
    <View style={styles.searchContainer}>
      <MaterialIcons
        name={showCancelIcon ? 'close' : 'search'}
        size={24}
        color={COLORS.lightGray}
        onPress={showCancelIcon ? handleCancel : null}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="搜尋課程"
        placeholderTextColor={COLORS.lightGray}
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:50,
    position:'relative',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 40,
    fontSize: 13,
    color: COLORS.gray,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex:1,
  },
});

export default SearchComponent;
