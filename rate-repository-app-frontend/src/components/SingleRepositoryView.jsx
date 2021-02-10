import React from 'react';
import { View, FlatList } from 'react-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { ItemSeparator } from '../theme';

const SingleRepository = () => {
    const { id } = useParams();
    const { data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id: id } 
    })

    const reviews = data?.repository.reviews.edges.map((edge) => edge.node);

    return (
        <FlatList
            data={reviews}
            ListHeaderComponent={() => <RepositoryItem repository={data.repository} clicked={true} />}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ index }) =>
                <ReviewItem review={reviews[index]} />
            }
        />
    )
}

export default SingleRepository;