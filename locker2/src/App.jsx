import React from 'react'
import LockerCreation from './components/LockerCreation'
import Grids from './components/Grids'
import SelectLocker from './components/SelectLocker'
import { Route, Routes } from 'react-router-dom'
import { Popup } from './components/Popup'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LockerCreation />} />
        <Route path='/grids' element={<Grids />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App