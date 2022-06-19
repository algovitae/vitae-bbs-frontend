import {gql} from '@apollo/client';

const groupQuery = gql`
  query Group($groupId: String!) {
    group(id: $groupId) {
      id,
      groupName
    }
  }
`;

const groupThreadsQuery = gql`
  query GroupThreads($groupId: String!) {
    group(id: $groupId) {
      threads {
        id,
        threadName
      }  
    }
  }
`;

const groupMembersQuery = gql`
  query GroupMembers($groupId: String!) {
    group(id: $groupId) {
      memberships {
        user {
          id,
          userName
        }
      }
    }
  }
`;

const createGroupMutation = gql`
  mutation CreateGroup($groupName: String!, $memberships: [String!]!) {
    createGroup(groupName: $groupName, memberships: $memberships) {
      id  
    }
  }
`;
