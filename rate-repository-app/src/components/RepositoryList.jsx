import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    margin: 10,
  },
  menu:{
    padding: 1
  },
  searchbar:{
    margin: 10,
    backgroundColor: 'white'
  }
});

const Querybar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      style={styles.searchbar}
      mode= 'bar'
      placeholder="Search"
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
    />
  )
}

const MenuOrdering = ({ selectedOrdering, setSelectedOrdering }) => {
  return (
    <View style={styles.menuContainer} >
      <Picker
        style={styles.menu}
        selectedValue={selectedOrdering}
        onValueChange={(itemValue) => 
          setSelectedOrdering(itemValue)
      }>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highestRated' />
        <Picker.Item label='Lowest rated repositories' value='lowestRated' />
      </Picker>
    </View>

  )
}

const FilterBar = ({ selectedOrdering, setSelectedOrdering, searchQuery, setSearchQuery }) => {
  return (
    <>
      <Querybar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MenuOrdering selectedOrdering={selectedOrdering} setSelectedOrdering={setSelectedOrdering}/>
    </>
    )
}

export const RepositoryListContainer = ({ repositories, onEndReach, selectedOrdering, setSelectedOrdering, searchQuery, setSearchQuery }) => {
  const ItemSeparator = () => <View style={styles.separator} />;
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  const navigate = useNavigate();
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <FilterBar 
          selectedOrdering={selectedOrdering} 
          setSelectedOrdering={setSelectedOrdering}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem props={item} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.9}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [value] = useDebounce(searchQuery, 500)

  let order = {
    orderBy: '',
    orderDirection: '',
    searchKeyword: ''
  }
  switch(selectedOrdering) {
    case 'latest':
      order = {orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: value}
      break
    case 'highestRated':
      order = {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: value}
      break
    case 'lowestRated':
      order = {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: value}
      break
  }

  const { repositories, fetchMore } = useRepositories( {first: 6 , ...order });
  
  const onEndReach = () => {
    console.log('onEndReach Repositories called')
    fetchMore();
  }

  return (
    <RepositoryListContainer 
      repositories={repositories}
      selectedOrdering={selectedOrdering}
      setSelectedOrdering={setSelectedOrdering}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  )
}
export default RepositoryList;