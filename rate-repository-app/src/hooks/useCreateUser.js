import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER); 

  const createUser = async ({ username, password }) => {
    const user = { username, password };
    const response = await mutate({variables: { user }});
    return response
  }
  return [createUser, result]
}

export default useCreateUser;