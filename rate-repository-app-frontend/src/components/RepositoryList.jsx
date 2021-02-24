import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom'
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

export const Dropdown = ({ setQuery }) => {

  const [ placeHolder, setPlaceHolder ] = useState({ label: 'Latest repositories', value: 'latest' })

  const changeValue = (value) => {
    switch(value) {
      case 'latest':
        setQuery({orderBy: 'CREATED_AT', orderDirection: 'DESC'})
        setPlaceHolder({ label: 'Latest repositories', value: 'latest' })
        break;
      case 'highest':
        setQuery({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'})
        setPlaceHolder({ label: 'Highest rated repositories', value: 'highest' })
        break;
      case 'lowest':
        setQuery({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'})
        setPlaceHolder({ label: 'Lowest rated repositories', value: 'lowest' })
        break;
      default:
        setQuery({orderBy: 'CREATED_AT', orderDirection: 'DESC'})
        setPlaceHolder({ label: 'Latest repositories', value: 'latest' })
        
    }
  }

  return (
      <RNPickerSelect
          onValueChange={(value) => changeValue(value)}
          placeholder={placeHolder}
          items={[              
              { label: 'Latest repositories', value: 'latest' },
              { label: 'Highest rated repositories', value: 'highest' },
              { label: 'Lowest rated repositories', value: 'lowest' },
          ]}
      />
  );
};

const HeaderComponent = ({ setQuery, setSearch, search }) => {
  
  const SearchBar = ({ setSearch, search }) => {

    const onChangeSearch = query => {
      setSearch(query);
    }

    return (
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={search}
      />
    );
  };

  return (
    <View>
      <SearchBar setSearch={setSearch} search={search} />
      <Dropdown setQuery={setQuery} />
    </View>
    
  )
}

export const RepositoryListContainer = ({ repositories, setQuery, setSearch, search, onEndReach }) => {
  let history = useHistory();

  const onClick = (repository) => {
    history.push(`/repository/${repository.id}`)
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    
  return (
    <View>
      <FlatList
        testID="repositoryListContainer"
        data={repositoryNodes}
        ListHeaderComponent={ <HeaderComponent setQuery={setQuery} setSearch={setSearch} search={search} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ index }) => 
          <TouchableOpacity onPress={() => onClick(repositoryNodes[index])}>
            <RepositoryItem repository={repositoryNodes[index]}/> 
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const RepositoryList = () => {
  const [ query, setQuery ] = useState({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
  const [ search, setSearch ] = useState('');
  const [ searchKeyword ] = useDebounce(search, 1000);

  const { repositories, fetchMore } = useRepositories({ ...query, searchKeyword, first: 5 });

  const onEndReach = () => {
    fetchMore();
    console.log('Repository list Loppuun meni')
  };

  return (
    <View>
      <RepositoryListContainer 
      repositories={repositories}
      setQuery={setQuery}
      setSearch={setSearch}
      search={search}
      onEndReach={onEndReach} />
    </View>
  )
};

export default RepositoryList;