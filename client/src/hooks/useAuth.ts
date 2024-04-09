import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tokenValue = atomWithStorage<string | null>('habitly-token', null)

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenValue)

  const setTokenValue = (newToken: string | null) => {
    setToken(newToken)
  }

  return {
    user: {
        token,
        setToken: setTokenValue,
    }
  }
}