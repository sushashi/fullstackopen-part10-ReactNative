import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


export const RepositoryListContainer = ({ repositories }) => {
  const ItemSeparator = () => <View style={styles.separator} />;

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  const navigate = useNavigate();
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem props={item} />
        </Pressable>
  )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories}/>
}
export default RepositoryList;