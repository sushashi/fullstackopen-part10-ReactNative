import { View, StyleSheet, Button, FlatList } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
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
  ratingBox: {
    margin: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderRadius: 21,
    width: 42,
    height: 42,
    alignItems: 'center'

  },
  ratingText: {
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: 'bold',
    margin: 8,
  },
  reviewText: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  usernameText:{
    fontWeight: 'bold'
  },
  dateText:{
    fontColor: theme.colors.textSecondary
  },
  containerRow: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  containerColumn: {
    flexDirection: 'column',
    padding: 10,
    flex: 1
  }
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

const ReviewItem = ({ review }) => {
  return(
    <View style={style.containerRow}>
      <View style={style.ratingBox}>
        <Text style={style.ratingText}>{review.rating}</Text>
      </View>

      <View style={style.containerColumn}>
        <Text style={style.usernameText}>{review.user.username}</Text>
        <Text style={style.dateText}>{review.createdAt.substring(0,10).replace(/-/g,'.')}</Text>
        <View style={style.reviewText}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
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