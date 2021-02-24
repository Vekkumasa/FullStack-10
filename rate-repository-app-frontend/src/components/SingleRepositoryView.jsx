import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { ItemSeparator } from '../theme';

const SingleRepository = () => {
    const { id } = useParams();
    const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id: id, first: 3 } 
    })

    const handleFetchMore = () => {
        const canFetchMore =
          !loading && data && data.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          console.log('loppu, ei ole enempää, tai jotain muuta tapahtu');
          return;
        }

        console.log('singlerepoview', data);
    
        fetchMore({
            query: GET_REPOSITORY,
            variables: {             
              after: data.repository.reviews.pageInfo.endCursor,
              first: 3,
              id,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const nextResult = {
                repository: {
                  ...fetchMoreResult.repository,
                  reviews: {
                    ...fetchMoreResult.repository.reviews,
                    edges: [
                      ...previousResult.repository.reviews.edges,
                      ...fetchMoreResult.repository.reviews.edges,
                    ],
                  },
                },
              };
              return nextResult;
            },
          });
        };

    const reviews = data?.repository.reviews.edges.map((edge) => edge.node);

    if (loading) return <View><Text>Loading</Text></View>
    
    return (
        <FlatList
            data={reviews}
            onEndReached={handleFetchMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={() => <RepositoryItem repository={data.repository} clicked={true} />}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ index }) =>
                <ReviewItem review={reviews[index]} />
            }
        />
    )
}

export default SingleRepository;