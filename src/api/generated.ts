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

export type App = {
  __typename?: 'App';
  maintainer?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_title_label?: Maybe<Scalars['String']>;
};

export type Auth = {
  __typename?: 'Auth';
  token?: Maybe<Scalars['String']>;
  userIdentity?: Maybe<UserIdentity>;
};

export type Group = Node & {
  __typename?: 'Group';
  groupName: Scalars['String'];
  /** unique identifier for the resource */
  id: Scalars['ID'];
  memberships: Array<Membership>;
  threads: Array<Thread>;
};

export type Membership = Node & {
  __typename?: 'Membership';
  group: Group;
  groupId: Scalars['String'];
  /** unique identifier for the resource */
  id: Scalars['ID'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMembership?: Maybe<Membership>;
  createGroup?: Maybe<Group>;
  createThread?: Maybe<Thread>;
  createThreadComment?: Maybe<ThreadComment>;
  deleteMembership?: Maybe<Group>;
  initiateSignup: Scalars['Boolean'];
  login?: Maybe<Auth>;
  resetPassword: Scalars['Boolean'];
  signup: Scalars['Boolean'];
};


export type MutationAddMembershipArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  groupName: Scalars['String'];
  memberships: Array<Scalars['String']>;
};


export type MutationCreateThreadArgs = {
  groupId: Scalars['String'];
  threadName: Scalars['String'];
};


export type MutationCreateThreadCommentArgs = {
  body: Scalars['String'];
  threadId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteMembershipArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationInitiateSignupArgs = {
  email: Scalars['String'];
  passphrase: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
  userName: Scalars['String'];
  userTitle: Scalars['String'];
};

export type Node = {
  /** unique identifier for the resource */
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  app?: Maybe<App>;
  group?: Maybe<Group>;
  thread?: Maybe<Thread>;
  userIdentityByAuthorization?: Maybe<UserIdentity>;
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};


export type QueryThreadArgs = {
  id: Scalars['String'];
};

export type Thread = Node & {
  __typename?: 'Thread';
  comments: Array<ThreadComment>;
  groupId: Scalars['String'];
  /** unique identifier for the resource */
  id: Scalars['ID'];
  threadName: Scalars['String'];
};

export type ThreadComment = Node & {
  __typename?: 'ThreadComment';
  body: Scalars['String'];
  commentedAt: Scalars['String'];
  commentedBy: User;
  /** unique identifier for the resource */
  id: Scalars['ID'];
  threadId: Scalars['String'];
  title: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  /** unique identifier for the resource */
  id: Scalars['ID'];
  memberships: Array<Membership>;
  userName: Scalars['String'];
  userTitle: Scalars['String'];
};

export type UserIdentity = Node & {
  __typename?: 'UserIdentity';
  email: Scalars['String'];
  /** unique identifier for the resource */
  id: Scalars['ID'];
  passwordHash: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, userName: string, userTitle: string }> };

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app?: { __typename?: 'App', title?: string | null, maintainer?: string | null, user_title_label?: string | null } | null };

export type GroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupQuery = { __typename?: 'Query', group?: { __typename?: 'Group', id: string, groupName: string } | null };

export type GroupThreadsQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupThreadsQuery = { __typename?: 'Query', group?: { __typename?: 'Group', threads: Array<{ __typename?: 'Thread', id: string, threadName: string }> } | null };

export type GroupMembersQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupMembersQuery = { __typename?: 'Query', group?: { __typename?: 'Group', memberships: Array<{ __typename?: 'Membership', user: { __typename?: 'User', id: string, userName: string, userTitle: string } }> } | null };

export type CreateGroupMutationVariables = Exact<{
  groupName: Scalars['String'];
  memberships: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup?: { __typename?: 'Group', id: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Auth', token?: string | null, userIdentity?: { __typename?: 'UserIdentity', email: string, user?: { __typename?: 'User', id: string, userName: string } | null } | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type DeleteMembershipMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership?: { __typename?: 'Group', id: string } | null };

export type AddMembershipMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type AddMembershipMutation = { __typename?: 'Mutation', addMembership?: { __typename?: 'Membership', id: string } | null };

export type UserIdentityByAuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type UserIdentityByAuthorizationQuery = { __typename?: 'Query', userIdentityByAuthorization?: { __typename?: 'UserIdentity', user?: { __typename?: 'User', memberships: Array<{ __typename?: 'Membership', group: { __typename?: 'Group', id: string, groupName: string } }> } | null } | null };

export type InitiateSignupMutationVariables = Exact<{
  email: Scalars['String'];
  passphrase: Scalars['String'];
}>;


export type InitiateSignupMutation = { __typename?: 'Mutation', initiateSignup: boolean };

export type SignupMutationVariables = Exact<{
  token: Scalars['String'];
  userName: Scalars['String'];
  userTitle: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type ThreadQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type ThreadQuery = { __typename?: 'Query', thread?: { __typename?: 'Thread', id: string, groupId: string, threadName: string } | null };

export type ThreadCommentsQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type ThreadCommentsQuery = { __typename?: 'Query', thread?: { __typename?: 'Thread', comments: Array<{ __typename?: 'ThreadComment', id: string, title: string, body: string, commentedAt: string, commentedBy: { __typename?: 'User', id: string, userName: string } }> } | null };

export type CreateThreadMutationVariables = Exact<{
  groupId: Scalars['String'];
  threadName: Scalars['String'];
}>;


export type CreateThreadMutation = { __typename?: 'Mutation', createThread?: { __typename?: 'Thread', id: string } | null };

export type CreateThreadCommentMutationVariables = Exact<{
  threadId: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateThreadCommentMutation = { __typename?: 'Mutation', createThreadComment?: { __typename?: 'ThreadComment', id: string } | null };


export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userTitle"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const AppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"App"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"maintainer"}},{"kind":"Field","name":{"kind":"Name","value":"user_title_label"}}]}}]}}]} as unknown as DocumentNode<AppQuery, AppQueryVariables>;
export const GroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Group"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}}]}}]}}]} as unknown as DocumentNode<GroupQuery, GroupQueryVariables>;
export const GroupThreadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupThreads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"threads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"threadName"}}]}}]}}]}}]} as unknown as DocumentNode<GroupThreadsQuery, GroupThreadsQueryVariables>;
export const GroupMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userTitle"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GroupMembersQuery, GroupMembersQueryVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberships"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberships"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberships"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userIdentity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const DeleteMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteMembershipMutation, DeleteMembershipMutationVariables>;
export const AddMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddMembershipMutation, AddMembershipMutationVariables>;
export const UserIdentityByAuthorizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserIdentityByAuthorization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userIdentityByAuthorization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserIdentityByAuthorizationQuery, UserIdentityByAuthorizationQueryVariables>;
export const InitiateSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitiateSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passphrase"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"passphrase"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passphrase"}}}]}]}}]} as unknown as DocumentNode<InitiateSignupMutation, InitiateSignupMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const ThreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Thread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"threadName"}}]}}]}}]} as unknown as DocumentNode<ThreadQuery, ThreadQueryVariables>;
export const ThreadCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ThreadComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commentedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commentedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ThreadCommentsQuery, ThreadCommentsQueryVariables>;
export const CreateThreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateThread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createThread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"threadName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateThreadMutation, CreateThreadMutationVariables>;
export const CreateThreadCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateThreadComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createThreadComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"threadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateThreadCommentMutation, CreateThreadCommentMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "Group",
      "Membership",
      "Thread",
      "ThreadComment",
      "User",
      "UserIdentity"
    ]
  }
};
      export default result;
    