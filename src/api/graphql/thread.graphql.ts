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

const createThreadMutation = gql`
  mutation CreateThread($groupId: String!, $threadName: String!) {
    createThread(group_id: $groupId, thread_name: $threadName) {
      thread_id
    }
  }
`;

const threadCommentMutation = gql`
  mutation CreateThreadComment($groupId: String!, $threadId: String!, $title: String!, $body: String!) {
    createThreadComment(group_id: $groupId, thread_id: $threadId, title: $title, body: $body) {
      thread_id
    }
  }
`;
