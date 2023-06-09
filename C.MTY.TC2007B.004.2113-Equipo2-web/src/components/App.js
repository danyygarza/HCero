import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import RegistroAlumno from "./RegistroAlumno"
import SuccessfulRegister from "./SuccessfulRegister"
import Donaciones from "./Donaciones"
import Puntaje from "./Puntaje"
import Equipos from "./Equipos"

function App() {
  return (
    <AuthProvider>        
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/registro-alumno" component={RegistroAlumno} />
              <PrivateRoute path="/donaciones" component={Donaciones} />
              <PrivateRoute path="/puntaje" component={Puntaje} />
              <PrivateRoute path="/equipos" component={Equipos} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/successful-register/:id" component={SuccessfulRegister} />
            </Switch>
          </AuthProvider>
        </Router>
    </AuthProvider>
  )
}

export default App;
