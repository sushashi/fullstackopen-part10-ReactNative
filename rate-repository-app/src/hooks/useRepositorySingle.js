import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepositorySingle = ( repositoryId ) => {
  const response = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  })
  const repository = response.loading ? [] : response.data.repository
  return [repository, response.loading];
}

export default useRepositorySingle;