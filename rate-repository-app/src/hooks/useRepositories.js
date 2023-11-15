import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( order ) => {

  const fetchRepositories = () => {
    console.log('fetchRepositories...')
  }

  const response = useQuery(GET_REPOSITORIES, {
    variables: order ,
    fetchPolicy: 'cache-and-network',
  });

  const repositories = response.data?.repositories
  const loading = response.loading;

  return { repositories, loading, refetch: fetchRepositories };
}

export default useRepositories;