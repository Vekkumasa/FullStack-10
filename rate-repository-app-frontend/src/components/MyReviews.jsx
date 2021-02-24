import React from 'react';
import { View, FlatList, StyleSheet, Button, Alert  } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { GET_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ItemSeparator } from '../theme';
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";
import useDeleteReview from '../hooks/useDeleteReview';

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
        padding: 2,
        borderWidth: 1,
        width: 30,
        textAlign: 'center',
        marginLeft: 2,
        color: 'blue',
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
        marginLeft: 50
    },
    background: {
        backgroundColor: theme.backgroundColors.LanguageBox,
    }
});

const buttonStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        marginLeft: 30,
        padding: 10
    }
})

const parseDate = (text) => {
    return format(new Date(text), 'MM/dd/yyyy')
}

const Review = ({ review, refetch }) => {
    return (
        <View style={border.container}>
            <ReviewHeader review={review} />
            <ReviewBody review={review} />
            <ReviewButtons review={review} refetch={refetch}/>
        </View>
    )
}

const ReviewHeader = ({ review }) => { 
    return (
        <View style={headerStyle.container}>
          <View style={headerStyle.avatarContainer}>
            <Text style={headerStyle.avatar}>
              {review.rating}
            </Text>
          </View>
          
          <View style={headerStyle.infoContainer}>
            <Text testID="fullName" color="textSecondary" fontWeight="bold" fontSize="heading"> {review.repository.name} </Text>
            <Text testID="description" color="primary"> {parseDate(review.createdAt)} </Text>
          </View>    
        </View>
    )
}

const ReviewBody = ({ review }) => {
    return (
        <View style={bodyStyle.container}>
            <Text> {review.text} </Text>
        </View>
    )
}

const ReviewButtons = ({ review, refetch }) => {
    const history = useHistory();

    const [deleteReview] = useDeleteReview();

    const viewRepository = () => {
        history.push(`/repository/${review.repository.id}`);
    }

    const deleteRepository = async () => {
        Alert.alert(
            "Delete Review",
            "Are you sure you want to delete review?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: async () => {
                await deleteReview(review.id)
                console.log('deleted')
                refetch();
              }}
            ],
          );
    }

    return(
        <View style={buttonStyle.container}>
            <Button
                onPress={() => viewRepository()}
                title="View Repository"
                color="blue"
                />
            <Button
                onPress={() => deleteRepository()}
                title="Delete Repository"
                color="red"
                />
        </View>
    )
}

const myReviews = () => {
    const { loading, data, refetch } = useQuery(GET_USER, {
      fetchPolicy: 'cache-and-network',
      variables: { includeReviews: true },
    });
    
    const reviews = data.authorizedUser.reviews.edges.map(e => e.node)

    if (loading) return <View><Text>Loading..</Text></View>

    return (
        <View>
            <FlatList
                testID="repositoryListContainer"
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ index }) => 
                    <Review review={reviews[index]} refetch={refetch} />
                }
            />
        </View>
    )
}

export default myReviews