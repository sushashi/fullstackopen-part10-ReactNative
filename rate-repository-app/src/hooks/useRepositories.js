// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   const response = await fetch('http://localhost:5000/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // }

  // useEffect(() => {
  //   fetchRepositories();
  // },[]);

  const fetchRepositories = () => {
    console.log('fetchRepositories...')
  }

  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  
  // console.log(response)

  const repositories = response.data?.repositories
  const loading = response.loading;

  return { repositories, loading, refetch: fetchRepositories };
}

export default useRepositories;