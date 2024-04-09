import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import { useApolloClient } from "@apollo/client"
import { useAuth } from "./hooks/useAuth"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Header from "./components/Header"
import useHasMounted from "./hooks/useHasMounted"

function App() {
  const { user } = useAuth()
  const client = useApolloClient()
  const location = useLocation()
  const prevLocation = location.state?.prevLocation
  const hasMounted = useHasMounted()

  const logout = () => {
    user.setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!hasMounted) {
    return null
  }

  if (!user.token) {
    return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setUser={user.setToken} />} />
          <Route path="/signup" element={<Signup setUser={user.setToken} />} />
          <Route path="/*" element={<Navigate to="/" replace={true}/>} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Header logout={logout} />
      <Routes location={prevLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" replace={true} />} />
        <Route path="/signup" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  )
}

export default App
