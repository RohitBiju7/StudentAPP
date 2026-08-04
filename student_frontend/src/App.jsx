// src/App.jsx
import Navbar from './components/Navbar.jsx'
import Register from './components/Register.jsx'

const App = () => {
  return (
    <div style={{ backgroundColor: '##09090b', minHeight: '100vh' }}>
      <Navbar />
      <Register />
    </div>
  )
}

export default App