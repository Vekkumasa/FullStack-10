import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query {
        repositories(orderBy: RATING_AVERAGE) {
          edges {
            node {
              id
              fullName
              description
              language
              forksCount
              stargazersCount
              ratingAverage
              reviewCount
              ownerAvatarUrl
            }
          }
        }
    }
`;