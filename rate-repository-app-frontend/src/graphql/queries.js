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

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
      }
    }
` 

export const GET_REVIEWS = gql`
    query repository($id: ID!) {
      repository(id: $id) {
        id
        fullName
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
      }
    }
` 

export const GET_USER = gql`
  query {
    authorizedUser {
      id,
      username
    }
  }
`;