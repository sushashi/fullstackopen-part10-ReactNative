import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 20,
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingTop: 20,
    paddingHorizontal: 5
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        <Link to="/signin">
          <Text style={styles.text}>Sign-In</Text>
        </Link>
      </ScrollView>
    </View>

  );
};

export default AppBar;