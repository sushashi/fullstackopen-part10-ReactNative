import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";


import ReviewItem from "./ReviewItem";
import Text from "./Text";
import theme from "../utils/theme";

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  buttonContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 0.5
  },
  button:{
    color: 'white',
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
  },
  buttonRed: {
    color: 'white',
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: 4,
    padding: 10,
  },
  separator: {
    height: 10
  }
})

const ReviewItemWithButtons = ({ review }) => {
  const navigate = useNavigate();

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (review) => {
    await mutate ({ variables: { "deleteReviewId": review.id }});
    review.refetch();
  };

  const handleDelete = ( review ) => {
    console.log('handle delete')
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { 
        text: 'CANCEL',
        style: 'cancel',
        onPress: () => console.log('CANCEL pressed'),
      },
      { 
        text: 'DELETE',
        style: 'default',
        onPress: () => deleteReview(review),
      },
    ]);
  };

  return (
    <>    
      <ReviewItem review={review} />
      
      <View style={styles.container} >
        <Pressable style={styles.buttonContainer} onPress={() => navigate(`/repo/${review.repoId}`)} >
          <Text style={styles.button}>View repository</Text>
        </Pressable>

        <Pressable style={styles.buttonContainer} onPress={() => handleDelete(review)} >
          <Text style={styles.buttonRed}>Delete review</Text>
        </Pressable>

      </View>
    </>
  )
}

const ReviewList = () => {
  const ItemSeparator = () => <View style={styles.separator} />;
  const response = useQuery(GET_ME, {
    variables: {'includeReviews': true},
    fetchPolicy: 'cache-and-network'
  })

  if (response.loading) return <></>
  const loaded = response.data?.me

  const reviews = loaded.reviews.edges.map( e => ({
    'rating': e.node.rating,
    'createdAt' : e.node.createdAt,
    'text': e.node.text,
    'user': { 'username' : e.node.repository.fullName},
    'id' : e.node.id,
    'repoId' : e.node.repository.id,
    'refetch' : response.refetch
    })
  )
  
  return (
    <FlatList
      data={reviews}
      keyExtractor={({id}) => id }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItemWithButtons review={item} /> }
    />
  )
}

export default ReviewList;