import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Habit = {
  __typename?: 'Habit';
  color: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createHabit?: Maybe<Habit>;
  createUser?: Maybe<User>;
  deleteHabit?: Maybe<Habit>;
  login?: Maybe<Token>;
  updateHabit?: Maybe<Habit>;
};


export type MutationCreateHabitArgs = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteHabitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateHabitArgs = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allHabits: Array<Habit>;
  findHabit?: Maybe<Habit>;
  me?: Maybe<User>;
  test?: Maybe<Scalars['String']['output']>;
};


export type QueryFindHabitArgs = {
  id: Scalars['ID']['input'];
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  habits: Array<Habit>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type HabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type HabitsQuery = { __typename?: 'Query', allHabits: Array<{ __typename?: 'Habit', id: string, name: string }> };

export type CreateHabitMutationVariables = Exact<{
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
  icon: Scalars['String']['input'];
}>;


export type CreateHabitMutation = { __typename?: 'Mutation', createHabit?: { __typename?: 'Habit', id: string, name: string } | null };

export type DeleteHabitMutationVariables = Exact<{
  deleteHabitId: Scalars['ID']['input'];
}>;


export type DeleteHabitMutation = { __typename?: 'Mutation', deleteHabit?: { __typename?: 'Habit', id: string } | null };

export type FindHabitQueryVariables = Exact<{
  findHabitId: Scalars['ID']['input'];
}>;


export type FindHabitQuery = { __typename?: 'Query', findHabit?: { __typename?: 'Habit', id: string, name: string } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, name: string } | null };

export type SignupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', name: string, username: string } | null };

export type UpdateHabitMutationVariables = Exact<{
  updateHabitId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
  icon: Scalars['String']['input'];
}>;


export type UpdateHabitMutation = { __typename?: 'Mutation', updateHabit?: { __typename?: 'Habit', id: string, name: string } | null };


export const HabitsDocument = gql`
    query Habits {
  allHabits {
    id
    name
  }
}
    `;

/**
 * __useHabitsQuery__
 *
 * To run a query within a React component, call `useHabitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHabitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHabitsQuery(baseOptions?: Apollo.QueryHookOptions<HabitsQuery, HabitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument, options);
      }
export function useHabitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HabitsQuery, HabitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument, options);
        }
export function useHabitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HabitsQuery, HabitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument, options);
        }
export type HabitsQueryHookResult = ReturnType<typeof useHabitsQuery>;
export type HabitsLazyQueryHookResult = ReturnType<typeof useHabitsLazyQuery>;
export type HabitsSuspenseQueryHookResult = ReturnType<typeof useHabitsSuspenseQuery>;
export type HabitsQueryResult = Apollo.QueryResult<HabitsQuery, HabitsQueryVariables>;
export const CreateHabitDocument = gql`
    mutation CreateHabit($name: String!, $color: String!, $icon: String!) {
  createHabit(name: $name, color: $color, icon: $icon) {
    id
    name
  }
}
    `;
export type CreateHabitMutationFn = Apollo.MutationFunction<CreateHabitMutation, CreateHabitMutationVariables>;

/**
 * __useCreateHabitMutation__
 *
 * To run a mutation, you first call `useCreateHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHabitMutation, { data, loading, error }] = useCreateHabitMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useCreateHabitMutation(baseOptions?: Apollo.MutationHookOptions<CreateHabitMutation, CreateHabitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHabitMutation, CreateHabitMutationVariables>(CreateHabitDocument, options);
      }
export type CreateHabitMutationHookResult = ReturnType<typeof useCreateHabitMutation>;
export type CreateHabitMutationResult = Apollo.MutationResult<CreateHabitMutation>;
export type CreateHabitMutationOptions = Apollo.BaseMutationOptions<CreateHabitMutation, CreateHabitMutationVariables>;
export const DeleteHabitDocument = gql`
    mutation DeleteHabit($deleteHabitId: ID!) {
  deleteHabit(id: $deleteHabitId) {
    id
  }
}
    `;
export type DeleteHabitMutationFn = Apollo.MutationFunction<DeleteHabitMutation, DeleteHabitMutationVariables>;

/**
 * __useDeleteHabitMutation__
 *
 * To run a mutation, you first call `useDeleteHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHabitMutation, { data, loading, error }] = useDeleteHabitMutation({
 *   variables: {
 *      deleteHabitId: // value for 'deleteHabitId'
 *   },
 * });
 */
export function useDeleteHabitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHabitMutation, DeleteHabitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHabitMutation, DeleteHabitMutationVariables>(DeleteHabitDocument, options);
      }
export type DeleteHabitMutationHookResult = ReturnType<typeof useDeleteHabitMutation>;
export type DeleteHabitMutationResult = Apollo.MutationResult<DeleteHabitMutation>;
export type DeleteHabitMutationOptions = Apollo.BaseMutationOptions<DeleteHabitMutation, DeleteHabitMutationVariables>;
export const FindHabitDocument = gql`
    query FindHabit($findHabitId: ID!) {
  findHabit(id: $findHabitId) {
    id
    name
  }
}
    `;

/**
 * __useFindHabitQuery__
 *
 * To run a query within a React component, call `useFindHabitQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindHabitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindHabitQuery({
 *   variables: {
 *      findHabitId: // value for 'findHabitId'
 *   },
 * });
 */
export function useFindHabitQuery(baseOptions: Apollo.QueryHookOptions<FindHabitQuery, FindHabitQueryVariables> & ({ variables: FindHabitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindHabitQuery, FindHabitQueryVariables>(FindHabitDocument, options);
      }
export function useFindHabitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindHabitQuery, FindHabitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindHabitQuery, FindHabitQueryVariables>(FindHabitDocument, options);
        }
export function useFindHabitSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindHabitQuery, FindHabitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindHabitQuery, FindHabitQueryVariables>(FindHabitDocument, options);
        }
export type FindHabitQueryHookResult = ReturnType<typeof useFindHabitQuery>;
export type FindHabitLazyQueryHookResult = ReturnType<typeof useFindHabitLazyQuery>;
export type FindHabitSuspenseQueryHookResult = ReturnType<typeof useFindHabitSuspenseQuery>;
export type FindHabitQueryResult = Apollo.QueryResult<FindHabitQuery, FindHabitQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    username
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignupDocument = gql`
    mutation signup($name: String!, $username: String!, $password: String!) {
  createUser(name: $name, username: $username, password: $password) {
    name
    username
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateHabitDocument = gql`
    mutation UpdateHabit($updateHabitId: ID!, $name: String!, $color: String!, $icon: String!) {
  updateHabit(id: $updateHabitId, name: $name, color: $color, icon: $icon) {
    id
    name
  }
}
    `;
export type UpdateHabitMutationFn = Apollo.MutationFunction<UpdateHabitMutation, UpdateHabitMutationVariables>;

/**
 * __useUpdateHabitMutation__
 *
 * To run a mutation, you first call `useUpdateHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHabitMutation, { data, loading, error }] = useUpdateHabitMutation({
 *   variables: {
 *      updateHabitId: // value for 'updateHabitId'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useUpdateHabitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHabitMutation, UpdateHabitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHabitMutation, UpdateHabitMutationVariables>(UpdateHabitDocument, options);
      }
export type UpdateHabitMutationHookResult = ReturnType<typeof useUpdateHabitMutation>;
export type UpdateHabitMutationResult = Apollo.MutationResult<UpdateHabitMutation>;
export type UpdateHabitMutationOptions = Apollo.BaseMutationOptions<UpdateHabitMutation, UpdateHabitMutationVariables>;