import React from 'react';
import { View } from 'react-native';
import Text from './Text';

const RepositoryItem = ({ repository }) => {
    return (
        <View key={repository.id}>
            <Text> { repository.fullName } </Text>
            <Text> { repository.description }</Text>
            <Text> { repository.language } </Text>
            <Text> { repository.forksCount }</Text>
            <Text> { repository.stargazersCount } </Text>
            <Text> { repository.ratingAverage } </Text>
            <Text> { repository.reviewCount } </Text>
            <Text> { repository.ownerAvatarUrl } </Text>
        </View>
    );
};

export default RepositoryItem;