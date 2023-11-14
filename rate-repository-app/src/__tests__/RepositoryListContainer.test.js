import { RepositoryListContainer } from "../components/RepositoryList";
import { render, screen } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      // Add your test code here
      const convert_K = (nb) => nb>1000 ? Math.round(nb/100)/10 +'k': nb

      const expectations = repositories.edges.map( (e) => ({
        "repoName": e.node.fullName,
        "repoDescription": e.node.description,
        "repoLanguage": e.node.language,
        "repoStarGazers" : convert_K(e.node.stargazersCount),
        "repoForksCount": convert_K(e.node.forksCount),
        "repoReviewCount": convert_K(e.node.reviewCount),
        "repoRatingAverage": convert_K(e.node.ratingAverage)
      }))

      const testIds = Object.keys(expectations[0])

      // console.log(testIds)
      render(<RepositoryListContainer repositories={repositories} />)

      const doTest = (item) => {
        // console.log(`Testing ${item}`)

        let [firstItem, secondItem ] = screen.getAllByTestId(item);
        expect(firstItem).toHaveTextContent(expectations[0][item])
        expect(secondItem).toHaveTextContent(expectations[1][item])
      }

      testIds.forEach( item => doTest(item) )
    });
  });
});