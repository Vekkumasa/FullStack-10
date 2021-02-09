import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

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
      marginBottom: 10,
    },
});

const linkToGitHub = StyleSheet.create({
    container: {
        padding: 5,
        width: 250,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: theme.backgroundColors.LanguageBox,
        marginLeft: 50
      },
      title: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
      }
})

const RepositoryHeader = ({ repository }) => {

    return (
        <View key={repository.id} style={headerStyle.container}>
            <View style={headerStyle.avatarContainer}>
                <Image style={headerStyle.avatar} source = {{uri:`${repository.ownerAvatarUrl}`}} />
            </View>
            <View style={headerStyle.infoContainer}>
                <Text testID="fullName" color="textSecondary" fontWeight="bold" fontSize="heading"> { repository.fullName } </Text>
                <Text testID="description" color="primary"> { repository.description } </Text>
            </View>
        </View>
    );
};

const RepositoryBody = ({ repository }) => {
    return (
        <View style={bodyStyle.container}>
            <Text testID="language" color="textSecondary" fontWeight="bold" style={bodyStyle.background}> {repository.language} </Text>
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
                <Text testID="review" color="textSecondary" fontWeight="bold">
                    {reviews}
                </Text>
                <Text> Reviews </Text>
            </View>
        </View>
    );
};

const LinkToGitHub = ({ repository, clicked }) => {
    if (!clicked) {
        return (
            <Text></Text>
        )
    }
    
    const onPress = () => {
        Linking.openURL(repository.url);
    }

    return(
        <View style={linkToGitHub.container}>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={linkToGitHub.title}>Link to GitHub</Text>
            </TouchableOpacity>
        </View>
    )
}

const RepositoryItem = ({ repository, clicked }) => {
    
    const repo = useQuery(GET_REPOSITORY, {
        variables: {id: repository.id}
    });

    return (
        <View style={border.container} testID={repository.id}>
            <RepositoryHeader repository={repository} />
            <RepositoryBody repository={repository} />
            <RepositoryFooter repository={repository} />
            <LinkToGitHub repository={repository} clicked={clicked} />
        </View>
    );
};

export default RepositoryItem;