import {gql} from '@apollo/client';

const myGroupsQuery = gql`
  query UserIdentityByAuthorization {
    userIdentityByAuthorization {
      user {
        memberships {
          group {
            group_id
            group_name
          }
        }
      }
    }
  }
`;
