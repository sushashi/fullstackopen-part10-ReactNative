import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepositorySingle = ( props ) => {

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: props,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...props
      },
    });
  };

  const repository = data?.repository;

  return {repository, fetchMore: handleFetchMore, loading, ...result};
}

export default useRepositorySingle;