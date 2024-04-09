import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LoginDocument, LoginMutation, LoginMutationVariables } from "@/generated/graphql"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDocumentTitle } from '@uidotdev/usehooks'

const Login = ({setUser}:{setUser: (token: string) => void}) => {
  useDocumentTitle('Login | Habitly')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const form = useForm()

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onError: (error) => {
        console.error(error)
    },
    onCompleted: ({ login }) => {
        setUser(login?.value as string)
    }
  })

  const submit = async () => {
    await login({ variables: { username, password } })
  }

  return (
    <div>
        <Link to="/">Back</Link>
        <h1>Login</h1>
        <form
            onSubmit={form.handleSubmit(submit)}
        >
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
            >
                {form.formState.isSubmitting ? 'Logging in...' : ':Login'}
            </button>
        </form>
    </div>
  )
}

export default Login