import { gql } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyGroupsQuery = gql`{
    "data": {
      "userIdentityByAuthorization": {
        "user": {
          "memberships": [
            {
              "group": {
                "group_id": "29pqLK8mTT2Bwcqq9NCKSoU10s4",
                "group_name": "group B"
              }
            },
            {
              "group": {
                "group_id": "29pq9NeBysRopKer9QfBcNijQEe",
                "group_name": "group A"
              }
            }
          ]
        }
      }
    }
  }`