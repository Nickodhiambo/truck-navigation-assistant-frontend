import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import TripPlanner from './pages/plan'
import LogSheet from './pages/log'
import Profile from './pages/profile'
import Registration from './pages/register'
import Login from './pages/login'
import PrivateRoute from './components/privateRoute'
import './App.css'


function App() {

  return (
    <>
      <div className='app'>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/plan-trip' element={<PrivateRoute><TripPlanner /></PrivateRoute>} />
            <Route path='/log-sheets' element={<PrivateRoute><LogSheet /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/signup' element={<Registration />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
