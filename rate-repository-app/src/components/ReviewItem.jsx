import { View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../utils/theme';

const style = StyleSheet.create({
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

const ReviewItem = ({ review }) => {
  // console.log('review item', review)
  if (!review) return <></>

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

export default ReviewItem;