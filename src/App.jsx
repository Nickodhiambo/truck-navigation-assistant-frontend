import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Plan from './pages/plan'
import Log from './pages/log'
import Profile from './pages/profile'
import './App.css'


function App() {

  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/plan-trip' element={<Plan />}/>
          <Route path='/log-sheets' element={<Log />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
