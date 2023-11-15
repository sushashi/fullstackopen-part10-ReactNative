import { Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import styles from "../utils/styles";
import useCreateReview from "../hooks/useCreateReview";

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput name='text' placeholder='Review' />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().integer().min(0).max(100).required('Rating is required'),
})

const Review = () => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate()

  const onSubmit = async (review) => {
    review = { ...review, rating: parseInt(review.rating) }
    try {
      const { response } = await createReview( review ) 
      const path = review.ownerName + '.' + review.repositoryName;
      console.log('path', path)
      navigate(`/repo/${path}`)
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default Review