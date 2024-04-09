import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import Home from "./pages/Home"
import Header from "./components/Header"

function App() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const prevLocation = location.state?.prevLocation

  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <>
      <Header logout={logout} />
      <Routes location={prevLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  )
}

export default App
