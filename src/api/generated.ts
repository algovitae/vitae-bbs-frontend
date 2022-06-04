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
  createGroup?: Maybe<Group>;
  login?: Maybe<Auth>;
};


export type MutationCreateGroupArgs = {
  group_name: Scalars['String'];
  memberships: Array<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  userIdentityByAuthorization?: Maybe<UserIdentity>;
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


export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_name"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    