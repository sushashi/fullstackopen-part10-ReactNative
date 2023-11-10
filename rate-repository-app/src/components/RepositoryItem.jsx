import { View, Image, StyleSheet } from 'react-native'
import Text from './Text';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    marginTop: 3,
    borderRadius: 5
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  containerColumnText: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginHorizontal: 10,
    flex: 3
  },
  containerRowCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 5,
  },
  textTitle:{
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  textDescription:{
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  textDescriptionBold: {
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center'
  },
  textLanguage: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 4,
  }
});

const RepositoryItem = ({props}) => {
  const round = (nb) => nb>1000 ? Math.round(nb/100)/10 +'k': nb

  return (
    <View style={styles.containerColumn}>
      <View style={styles.containerRow}>
        <Image
          style={styles.tinyLogo}
          source={{uri:props.ownerAvatarUrl,}}
        />

        <View style={styles.containerColumnText}>
          <Text style={styles.textTitle}>{props.fullName}</Text>
          <Text style={styles.textDescription}>{props.description}</Text>
          <Text style={styles.textLanguage}>{props.language}</Text>
        </View>
      </View>

      <View style={styles.containerRowCount}>
        <View style={styles.containerColumn}>
          <Text style={styles.textDescriptionBold}>{round(props.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text style={styles.textDescriptionBold}>{round(props.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text style={styles.textDescriptionBold}>{round(props.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text style={styles.textDescriptionBold}>{round(props.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>

    </View>
  );
};

export default RepositoryItem;