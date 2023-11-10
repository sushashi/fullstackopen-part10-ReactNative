import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const token = await mutate({ variables: { credentials } })
    await authStorage.setAccessToken(token.data.authenticate.accessToken);
    apolloClient.resetStore();

    return token;
  };
  return [signIn, result];
};

export default useSignIn;