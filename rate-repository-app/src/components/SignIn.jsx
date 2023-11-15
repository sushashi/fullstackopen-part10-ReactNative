import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import styles from '../utils/styles';
import Text from './Text';

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
