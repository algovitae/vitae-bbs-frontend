import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = {
  __typename?: 'Auth';
  token?: Maybe<Scalars['String']>;
  user_identity?: Maybe<UserIdentity>;
};

export type Group = {
  __typename?: 'Group';
  group_id: Scalars['ID'];
  group_name: Scalars['String'];
  threads: Array<Thread>;
};

export type Membership = {
  __typename?: 'Membership';
  group: Group;
  group_id: Scalars['String'];
  user: User;
  user_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMembership?: Maybe<Membership>;
  createGroup?: Maybe<Group>;
  createThread?: Maybe<Thread>;
  createThreadComment?: Maybe<ThreadComment>;
  deleteMembership?: Maybe<Group>;
  login?: Maybe<Auth>;
};


export type MutationAddMembershipArgs = {
  group_id: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  group_name: Scalars['String'];
  memberships: Array<Scalars['String']>;
};


export type MutationCreateThreadArgs = {
  group_id: Scalars['String'];
  thread_name: Scalars['String'];
};


export type MutationCreateThreadCommentArgs = {
  body: Scalars['String'];
  group_id: Scalars['String'];
  thread_id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteMembershipArgs = {
  group_id: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  group?: Maybe<Group>;
  thread?: Maybe<Thread>;
  userIdentityByAuthorization?: Maybe<UserIdentity>;
};


export type QueryGroupArgs = {
  group_id: Scalars['String'];
};


export type QueryThreadArgs = {
  group_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type Thread = {
  __typename?: 'Thread';
  comments: Array<ThreadComment>;
  group_id: Scalars['ID'];
  thread_id: Scalars['ID'];
  thread_name: Scalars['String'];
};

export type ThreadComment = {
  __typename?: 'ThreadComment';
  body: Scalars['String'];
  comment_id: Scalars['ID'];
  commented_at: Scalars['String'];
  commented_by: User;
  thread_id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  memberships: Array<Membership>;
  user_id: Scalars['ID'];
  user_name: Scalars['String'];
};

export type UserIdentity = {
  __typename?: 'UserIdentity';
  email: Scalars['ID'];
  password_hash: Scalars['String'];
  user?: Maybe<User>;
  user_id: Scalars['String'];
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', user_id: string, user_name: string }> };

export type GroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupQuery = { __typename?: 'Query', group?: { __typename?: 'Group', group_id: string, group_name: string } | null };

export type GroupThreadsQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupThreadsQuery = { __typename?: 'Query', group?: { __typename?: 'Group', threads: Array<{ __typename?: 'Thread', thread_id: string, thread_name: string }> } | null };

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Auth', token?: string | null, user_identity?: { __typename?: 'UserIdentity', email: string, user?: { __typename?: 'User', user_id: string, user_name: string } | null } | null } | null };

export type UserIdentityByAuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type UserIdentityByAuthorizationQuery = { __typename?: 'Query', userIdentityByAuthorization?: { __typename?: 'UserIdentity', user?: { __typename?: 'User', memberships: Array<{ __typename?: 'Membership', group: { __typename?: 'Group', group_id: string, group_name: string } }> } | null } | null };

export type ThreadQueryVariables = Exact<{
  groupId: Scalars['String'];
  threadId: Scalars['String'];
}>;


export type ThreadQuery = { __typename?: 'Query', thread?: { __typename?: 'Thread', group_id: string, thread_id: string, thread_name: string } | null };

export type ThreadCommentsQueryVariables = Exact<{
  groupId: Scalars['String'];
  threadId: Scalars['String'];
}>;


export type ThreadCommentsQuery = { __typename?: 'Query', thread?: { __typename?: 'Thread', comments: Array<{ __typename?: 'ThreadComment', comment_id: string, title: string, body: string, commented_at: string, commented_by: { __typename?: 'User', user_id: string, user_name: string } }> } | null };

export type CreateThreadCommentMutationVariables = Exact<{
  groupId: Scalars['String'];
  threadId: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateThreadCommentMutation = { __typename?: 'Mutation', createThreadComment?: { __typename?: 'ThreadComment', thread_id: string } | null };


export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const GroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Group"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group_id"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}}]}}]}}]} as unknown as DocumentNode<GroupQuery, GroupQueryVariables>;
export const GroupThreadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupThreads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"threads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread_id"}},{"kind":"Field","name":{"kind":"Name","value":"thread_name"}}]}}]}}]}}]} as unknown as DocumentNode<GroupThreadsQuery, GroupThreadsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user_identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UserIdentityByAuthorizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserIdentityByAuthorization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userIdentityByAuthorization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group_id"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserIdentityByAuthorizationQuery, UserIdentityByAuthorizationQueryVariables>;
export const ThreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Thread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"thread_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group_id"}},{"kind":"Field","name":{"kind":"Name","value":"thread_id"}},{"kind":"Field","name":{"kind":"Name","value":"thread_name"}}]}}]}}]} as unknown as DocumentNode<ThreadQuery, ThreadQueryVariables>;
export const ThreadCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ThreadComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"thread_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commented_by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commented_at"}}]}}]}}]}}]} as unknown as DocumentNode<ThreadCommentsQuery, ThreadCommentsQueryVariables>;
export const CreateThreadCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateThreadComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createThreadComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"thread_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread_id"}}]}}]}}]} as unknown as DocumentNode<CreateThreadCommentMutation, CreateThreadCommentMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    