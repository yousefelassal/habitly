import {
    ApolloClient,
    ApolloProvider as Provider,
    InMemoryCache,
  createHttpLink,
  } from '@apollo/client'
  import { setContext } from '@apollo/client/link/context'
  import { useAuth } from '@/hooks/useAuth'
  
  interface Props {
    children: React.ReactNode
  }
  
  const ApolloProvider = ({children}:Props) => {
    const { user } = useAuth()
    const authLink = setContext((_, { headers }) => {
      return {
          headers: {
            ...headers,
            authorization: user?.token ? `Bearer ${user.token}` : null,
          }
      }
    })
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_SERVER,
    })
    
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    })
  
    return (
      <Provider client={client}>
        {children}
      </Provider>
    )
  }
  
  export default ApolloProvider