import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import RepositorySingleItem from './RepositorySingleItem';
import Review from './Review';
import theme from '../utils/theme';
import SignUp from './SignUp';
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/repo/:repoId' element={<RepositorySingleItem />} />
        <Route path='/review' element={<Review />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reviews' element={<ReviewList />} />
      </Routes>
    </View>
  );
};

export default Main;