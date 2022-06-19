import {gql} from '@apollo/client';

const deleteMembershipMutation = gql`
  mutation DeleteMembership($userId: String!, $groupId: String!) {
      deleteMembership(userId: $userId, groupId: $groupId) {
        id
      }
  }
`;

const addMembershipMutation = gql`
  mutation AddMembership($userId: String!, $groupId: String!) {
    addMembership(userId: $userId, groupId: $groupId) {
      id
    }
  }
`;
