import {gql} from '@apollo/client';

const threadsQuery = gql`
  query Thread($groupId: String!, $threadId: String!) {
      thread(group_id: $groupId, thread_id: $threadId) {
        group_id,
        thread_id,
        thread_name,
      }
    }
`;
const threadCommentsQuery = gql`
  query ThreadComments($groupId: String!, $threadId: String!) {
      thread(group_id: $groupId, thread_id: $threadId) {
        comments {
          comment_id,
          title,
          body,
          commented_by {
            user_id,
            user_name
          },
          commented_at
        }
      }
    }
`;
