import {gql} from '@apollo/client';

const groupQuery = gql`
  query Group($groupId: String!) {
      group(group_id: $groupId) {
        group_id,
        group_name,
      }
    }
`;

const groupThreadsQuery = gql`
  query GroupThreads($groupId: String!) {
      group(group_id: $groupId) {
        threads {
          thread_id,
          thread_name
        }  
      }
    }
`;
