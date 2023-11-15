import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';

import { GET_ME } from '../graphql/queries'
import Constants from 'expo-constants';
import theme from '../utils/theme';
import useAuthStorage from '../hooks/useAuthStorage';

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

const SignInBar = () => {
  return (
    <Link to="/signin">
      <Text style={styles.text}>Sign-In</Text>
    </Link>
  )
}

const SignOutBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <Text onPress={logout} style={styles.text}>Sign-Out</Text>
  )
}

const AppBar = () => {
  const response = useQuery(GET_ME);
  const me = response.data?.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {me ? <SignOutBar /> : <SignInBar />}

      </ScrollView>
    </View>

  );
};

export default AppBar;