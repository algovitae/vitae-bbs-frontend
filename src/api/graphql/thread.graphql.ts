import {gql} from '@apollo/client';

const threadsQuery = gql`
  query Thread($threadId: String!) {
    thread(id: $threadId) {
      id,
      groupId, 
      threadName
    }
  }
`;
const threadCommentsQuery = gql`
  query ThreadComments($threadId: String!) {
    thread(id: $threadId) {
      comments {
        id,
        title,
        body,
        commentedBy {
          id,
          userName
        },
        commentedAt
      }
    }
  }
`;

const createThreadMutation = gql`
  mutation CreateThread($groupId: String!, $threadName: String!) {
    createThread(groupId: $groupId, threadName: $threadName) {
      id
    }
  }
`;

const threadCommentMutation = gql`
  mutation CreateThreadComment($threadId: String!, $title: String!, $body: String!) {
    createThreadComment(threadId: $threadId, title: $title, body: $body) {
      id
    }
  }
`;
