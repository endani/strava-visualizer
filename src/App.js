import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Activities from "./pages/activities"
import Login from "./pages/login"
import Single from "./pages/single"

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/activities" exact component={Activities} />
        <Route path="/activities/:id" exact component={Single} />
      </BrowserRouter>
    </>
  )
}

export default App
