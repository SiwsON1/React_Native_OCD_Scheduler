import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const ScreenHeaderBtn = ({ iconName, iconSize = 25, iconColor = 'black', handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    btnContainer: {
      width: 40,
      height: 40,
      backgroundColor: '#3333',
      borderRadius: 12 / 1.25,
      justifyContent: "center",
      alignItems: "center",
    },
    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: 12 / 1.25,
    }),
  });

export default ScreenHeaderBtn;