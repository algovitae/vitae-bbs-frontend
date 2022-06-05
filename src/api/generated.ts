import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export type Maybe<T> = T | undefined;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  allUsers: User[];
  userIdentityByAuthorization?: Maybe<UserIdentity>;
};

export type User = {
  __typename?: 'User';
  memberships: Membership[];
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

export type AllUsersQueryVariables = Exact<Record<string, never>>;

export type AllUsersQuery = {
  __typename?: 'Query';
  allUsers: Array<{__typename?: 'User'; user_id: string; user_name: string}>;
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?:
  | {
    __typename?: 'Auth';
    token?: string | undefined;
    user_identity?:
    | {
      __typename?: 'UserIdentity';
      email: string;
      user?:
      | {__typename?: 'User'; user_id: string; user_name: string}
      | undefined;
    }
    | undefined;
  }
  | undefined;
};

export const AllUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {kind: 'Name', value: 'AllUsers'},
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {kind: 'Name', value: 'allUsers'},
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {kind: 'Field', name: {kind: 'Name', value: 'user_id'}},
                {kind: 'Field', name: {kind: 'Name', value: 'user_name'}},
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {kind: 'Name', value: 'Login'},
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {kind: 'Variable', name: {kind: 'Name', value: 'email'}},
          type: {kind: 'NamedType', name: {kind: 'Name', value: 'String'}},
        },
        {
          kind: 'VariableDefinition',
          variable: {kind: 'Variable', name: {kind: 'Name', value: 'password'}},
          type: {kind: 'NamedType', name: {kind: 'Name', value: 'String'}},
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {kind: 'Name', value: 'login'},
            arguments: [
              {
                kind: 'Argument',
                name: {kind: 'Name', value: 'email'},
                value: {kind: 'Variable', name: {kind: 'Name', value: 'email'}},
              },
              {
                kind: 'Argument',
                name: {kind: 'Name', value: 'password'},
                value: {
                  kind: 'Variable',
                  name: {kind: 'Name', value: 'password'},
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {kind: 'Field', name: {kind: 'Name', value: 'token'}},
                {
                  kind: 'Field',
                  name: {kind: 'Name', value: 'user_identity'},
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {kind: 'Field', name: {kind: 'Name', value: 'email'}},
                      {
                        kind: 'Field',
                        name: {kind: 'Name', value: 'user'},
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {kind: 'Name', value: 'user_id'},
                            },
                            {
                              kind: 'Field',
                              name: {kind: 'Name', value: 'user_name'},
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;

export interface PossibleTypesResultData {
  possibleTypes: Record<string, string[]>;
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
