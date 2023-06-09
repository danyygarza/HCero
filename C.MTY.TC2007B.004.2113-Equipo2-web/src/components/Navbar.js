import React, { useState } from "react"
import logo from "../logo.png"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Button} from "react-bootstrap"


export const Navbar = () => {

  const [error, setError] = useState("")
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="#"><img className="logo"src={logo} alt="logo..." /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Inicio <span class="sr-only"></span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/donaciones">Donaciones</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/puntaje">Puntaje</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/equipos">Equipos</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/registro-alumno">Registrar alumno</a>
                </li>
                <div className="button1">
                  <Button  onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </div>
              </ul>
            </div>
          </div>
      </nav>
    )
}

export default Navbar