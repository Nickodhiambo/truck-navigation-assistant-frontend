import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import TripPlanner from './pages/plan'
import LogSheet from './pages/log'
import Profile from './pages/profile'
import './App.css'


function App() {

  return (
    <>
      <div className='app'>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/plan-trip' element={<TripPlanner />} />
            <Route path='/log-sheets' element={<LogSheet />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
