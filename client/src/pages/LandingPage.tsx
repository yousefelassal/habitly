
import { Link } from "react-router-dom";
import { useDocumentTitle } from '@uidotdev/usehooks'

const LandingPage = () => {
  useDocumentTitle('Habitly')
  return (
    <div>
      <h1>Habitly</h1>
      <p>Track your habits and achieve your goals.</p>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Log in</Link>
    </div>
  )
}

export default LandingPage