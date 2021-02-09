import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns'

const borderStyle = StyleSheet.create({
    container: {
        padding: 5,
        borderWidth: 2,
    },
    secondaryContainer: {
        flexDirection: 'row',
        flexGrow: 1,
    }
});

const RatingStyle = StyleSheet.create({
    container: {
        borderColor: theme.backgroundColors.LanguageBox,
        borderWidth: 2,
        borderRadius: 50,
        width: 30,
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
    },
    rating: {
        textAlign: "center",
        marginTop: 3,
    }
})

const HeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexGrow: 1,
        paddingTop: 5,
        paddingLeft: 10,
    },
})

const ReviewStyle = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: 45
    }
})

const ReviewRating = ({ review, style }) => {   
    return (
        <View style={style.container}>
            <Text style={style.rating}>{review.rating}</Text> 
        </View>
    )
}

const ReviewHeader = ({ review, style }) => {
    
    const parseDate = (text) => {
        return format(new Date(text), 'MM/dd/yyyy')
    }

    return (
        <View style={style.container}>
            <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text> 
            <Text>{parseDate(review.createdAt)}</Text>
        </View>
    )
}

const ReviewText = ({ review, style }) => {
    return (
        <View style={style.container}> 
            <Text>{review.text}</Text>
        </View>
    )
}

const ReviewItem = ({ review }) => {
    return (
        <View style={borderStyle.container}>
            <View style={borderStyle.secondaryContainer}>
                <ReviewRating style={RatingStyle} review={review} />
                <ReviewHeader style={HeaderStyle} review={review} />
            </View>
            <ReviewText style={ReviewStyle} review={review} />
        </View>
    )
}

export default ReviewItem;