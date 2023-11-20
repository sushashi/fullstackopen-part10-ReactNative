import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( order ) => {

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: order ,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...order
      },
    });
  };

  const repositories = data?.repositories;

  return { repositories, fetchMore: handleFetchMore, loading, ...result };
}

export default useRepositories;