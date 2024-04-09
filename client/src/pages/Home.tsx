import { useQuery } from "@apollo/client"
import {
    HabitsDocument,
    HabitsQuery,
    HabitsQueryVariables,
} from '@/generated/graphql'
import { useDocumentTitle } from "@uidotdev/usehooks"

const Home = () => {
  const { data, loading, error } = useQuery<HabitsQuery, HabitsQueryVariables>(HabitsDocument)
  useDocumentTitle('Home | Habitly')
  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>Error</p>}
    {data && (
        <div>
            <h1>Home</h1>
            <ul>
                {data.allHabits.map((habit) => (
                    <li key={habit.id}>
                        {habit.name}
                    </li>
                ))}
            </ul>
        </div>
    )}
    </>
  )
}

export default Home