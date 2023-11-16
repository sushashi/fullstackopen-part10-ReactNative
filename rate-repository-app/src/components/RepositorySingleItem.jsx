import { View, StyleSheet, Button, FlatList } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import useRepositorySingle from "../hooks/useRepositorySingle";
import theme from "../utils/theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },
  separator: {
    height: 10
  },
  button:{
    color: theme.colors.primary,
  },
})

const RepositoryInfo = ({ repository }) => {
  return(
    <>
      <RepositoryItem props={repository} />
      <View style={style.container}>
        <Button
          style={style.button}
          color={theme.colors.primary}
          title='Open in GitHUB'
          onPress={() => Linking.openURL(repository.url)}
        />
      </View>
    </>
  )
}

const RepositorySingleItem = () => {
  const { repoId } = useParams();
  
  const [ repository, isLoading ] = useRepositorySingle(repoId);
  if (isLoading) return <View></View>

  const reviews = repository.reviews.edges.map( e => e.node )

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={style.separator} />}
    />
  )
}

export default RepositorySingleItem