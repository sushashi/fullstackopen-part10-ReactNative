import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    margin: 10,
  },
  menu:{
    padding: 1
  }
});

const MenuOrdering = ({ selectedOrdering, setSelectedOrdering }) => {
  return (
    <View style={styles.menuContainer} >
      <Picker
        style={styles.menu}
        selectedValue={selectedOrdering}
        onValueChange={(itemValue, itemIndex) => 
          setSelectedOrdering(itemValue)
      }>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highestRated' />
        <Picker.Item label='Lowest rated repositories' value='lowestRated' />
      </Picker>
    </View>

  )
}

export const RepositoryListContainer = ({ repositories, selectedOrdering, setSelectedOrdering }) => {
  const ItemSeparator = () => <View style={styles.separator} />;
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  const navigate = useNavigate();
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<MenuOrdering selectedOrdering={selectedOrdering} setSelectedOrdering={setSelectedOrdering}/>}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem props={item} />
        </Pressable>
  )}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState('latest')
  let order = {
    orderBy: '',
    orderDirection: ''
  }
  switch(selectedOrdering) {
    case 'latest':
      order = {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
      break
    case 'highestRated':
      order = {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
      break
    case 'lowestRated':
      order = {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
      break
  }

  const { repositories } = useRepositories(order);
  return (
    <RepositoryListContainer 
      repositories={repositories}
      selectedOrdering={selectedOrdering}
      setSelectedOrdering={setSelectedOrdering}
    />
  )
}
export default RepositoryList;