import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = { ownerName, repositoryName, rating, text };
    const response = await mutate({ variables: { review }});

    return response
  }
  return [createReview, result];
}

export default useCreateReview;