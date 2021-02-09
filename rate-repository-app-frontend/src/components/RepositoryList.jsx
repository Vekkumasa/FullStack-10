import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom'

export const RepositoryListContainer = ({ repositories }) => {
  let history = useHistory();

  const onClick = (repository) => {
    history.push(`/repository/${repository.id}`)
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    
  return (
    <FlatList
      testID="repositoryListContainer"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ index }) => 
        <TouchableOpacity onPress={() => onClick(repositoryNodes[index])}>
          <RepositoryItem repository={repositoryNodes[index]}/> 
        </TouchableOpacity>
      }
    />
  );
}

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;