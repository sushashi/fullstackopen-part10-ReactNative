import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../utils/theme';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white'
  },
  button:{
    color: 'white',
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  }
})

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Pressable onPress={onSubmit} >
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => { 
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();
  
  const onSubmit = async values => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password })
      console.log('data', data)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  };
  return <SignInContainer onSubmit={onSubmit} />
};

export default SignIn;
