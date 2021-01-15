import React from 'react';
import Text from './Text';
import { View, TouchableWithoutFeedback } from 'react-native';

const AppBarTab = ({ color, fontSize, fontWeight, tab }) => {
  return (
    <View key={tab.id}>
        <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
            <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
                {tab.name}
            </Text>
        </TouchableWithoutFeedback>
    </View>
  );
};
export default AppBarTab;