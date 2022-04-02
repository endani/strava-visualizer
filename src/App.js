import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Activities from './pages/activities'
import Login from './pages/login'
import ActivitySingle from './pages/single'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/activities" exact element={<Activities />} />
          <Route path="/activities/:id" exact element={<ActivitySingle />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
