import {gql} from '@apollo/client';

const myGroupsQuery = gql`
  query UserIdentityByAuthorization {
    userIdentityByAuthorization {
      user {
        memberships {
          group {
            id
            groupName
          }
        }
      }
    }
  }
`;
