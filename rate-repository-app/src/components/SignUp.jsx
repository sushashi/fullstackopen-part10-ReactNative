import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import styles from '../utils/styles';
import Text from './Text';

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container} >
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry />
      <Pressable onPress={onSubmit} >
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'),null],'Password must match').required('Password confirmation is required')
})

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const user = {'username': values.username, 'password': values.password};
    try {
      await createUser( user )
      await signIn ( user )
      navigate('/')

    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp;