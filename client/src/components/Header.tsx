

const Header = ({logout}:{
    logout: () => void
}) => {
  return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Header