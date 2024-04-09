import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useApolloClient } from "@apollo/client"

const tokenValue = atomWithStorage<string | null>('habitly-token', null)

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenValue)
  const client = useApolloClient()

  const setTokenValue = (newToken: string | null) => {
    setToken(newToken)
    client.clearStore()
  }

  const logout = () => {
    setTokenValue(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token) {
    return {
        user: null,
        logout
    }
  }

  return {
    user: {
        token,
        setToken: setTokenValue,
    },
    logout
  }
}