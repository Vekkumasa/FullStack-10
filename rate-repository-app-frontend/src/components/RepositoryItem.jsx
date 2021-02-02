import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const border = StyleSheet.create({
    container: {
        padding: 5,
        borderWidth: 2,
    }
});

const headerStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2
    },
    avatarContainer: {
        flexGrow: 0,
        paddingRight: 15
    },
    infoContainer: {
        flexGrow: 1
    }
});

const bodyStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        marginLeft: 63
    },
    background: {
        backgroundColor: theme.backgroundColors.LanguageBox,
    }
});


const footerStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-around',
      marginLeft: 45,
    },
});

const RepositoryHeader = ({ repository }) => {
    
    return (
        <View key={repository.id} style={headerStyle.container}>
            <View style={headerStyle.avatarContainer}>
                <Image style={headerStyle.avatar} source = {{uri:`${repository.ownerAvatarUrl}`}} />
            </View>
            <View style={headerStyle.infoContainer}>
                <Text color="textSecondary" fontWeight="bold" fontSize="heading"> { repository.fullName } </Text>
                <Text color="primary"> { repository.description } </Text>
            </View>
        </View>
    );
};

const RepositoryBody = ({ repository }) => {
    return (
        <View style={bodyStyle.container}>
            <Text color="textSecondary" fontWeight="bold" style={bodyStyle.background}> {repository.language} </Text>
        </View>
    );
};

const numberParser = (number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";       
    } 
    return number;
};

const RepositoryFooter = ({ repository }) => {
    const forks = numberParser(repository.forksCount);
    const stars = numberParser(repository.stargazersCount);
    const rating = numberParser(repository.ratingAverage);
    const reviews = numberParser(repository.reviewCount);
    return (
        <View style={footerStyle.container}>
            <View>
                <Text color="textSecondary" fontWeight="bold">
                    {forks}
                </Text>
                <Text> Forks </Text>
            </View>
            <View>
                <Text color="textSecondary" fontWeight="bold">
                    {stars}
                </Text>
                <Text> Stars </Text>
            </View>
            <View>
                <Text color="textSecondary" fontWeight="bold">
                    {rating}
                </Text>
                <Text> Avg </Text>
            </View>
            <View>
                <Text color="textSecondary" fontWeight="bold">
                    {reviews}
                </Text>
                <Text> Reviews </Text>
            </View>
        </View>
    );
};

const RepositoryItem = ({ repository }) => {
    return (
        <View style={border.container}>
            <RepositoryHeader repository={repository} />
            <RepositoryBody repository={repository} />
            <RepositoryFooter repository={repository} />
        </View>
    );
};

export default RepositoryItem;