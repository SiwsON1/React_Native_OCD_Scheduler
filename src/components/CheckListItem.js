import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChecklistItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        <View style={[styles.checkbox, { backgroundColor: isChecked ? 'blue' : 'transparent' }]}>
          {isChecked && <Icon name="check" size={15} color="white" />}
        </View>
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.item}</Text>
      <TouchableOpacity style={styles.menuButton} onPress={() => { /* Here add your menu function */ }}>
        <Icon name="ellipsis-v" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginLeft: 10,
    flex: 1,
  },
  menuButton: {
    marginLeft: 'auto',
  },
});

export default ChecklistItem;