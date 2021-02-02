import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from '../theme';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ index }) => <RepositoryItem repository={repositoryNodes[index]}/> }
          />
    );
};

export default RepositoryList;