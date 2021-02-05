import React from 'react';
import Text from './Text';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

const AppBarTab = ({ color, fontSize, fontWeight, padding, tab, onClick }) => {
  return (
    <View key={tab.id}>
      <Link to={tab.link}>
        {onClick?
          <TouchableWithoutFeedback onPress={onClick}>
            <Text color={color} fontSize={fontSize} fontWeight={fontWeight} padding={padding}>
              {tab.name}
            </Text>
          </TouchableWithoutFeedback>
        :
          <Text color={color} fontSize={fontSize} fontWeight={fontWeight} padding={padding}>
            {tab.name}
          </Text>
        }  
      </Link>
    </View>
  );
};
export default AppBarTab;