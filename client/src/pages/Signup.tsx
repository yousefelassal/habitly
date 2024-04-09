import { useState } from "react"
import { useMutation } from "@apollo/client"
import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
    SignupDocument,
    SignupMutation,
    SignupMutationVariables,
} from "@/generated/graphql"
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"


const Signup = ({setUser}:{setUser: (token: string) => void}) => {
  useDocumentTitle('Signup | Habitly')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const form = useForm()

  const [signup] = useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, {
      onError: (error) => {
        console.error(error)
      }
    })

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
    onError: (error) => {
      console.error(error)
    },
    onCompleted: ({ login }) => {
      setUser(login?.value as string)
    }
  })

  const submit = async () => {
    await signup({ variables: { name, username, password } })
    await login({ variables: { username, password } })
  }

  return (
    <div>
        <Link to="/">Back</Link>
        <h1>Signup</h1>
        <form
            onSubmit={form.handleSubmit(submit)}
        >
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
                disabled={form.formState.isSubmitting}
            >
                {form.formState.isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
        </form>
    </div>
  )
}

export default Signup