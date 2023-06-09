import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import logo from "../logo.png"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
      e.preventDefault()

      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Failed to log in")
      }
      setLoading(false)
  }

  return (
      < >
      <div className="shadow-box-example z-depth-5">
       <Card>
           <Card.Body>
           <div className="d-flex p-1"></div>
           <h2 className="text-center mb-4">Log In</h2>
           <a className="navbar-brand" href="#"><img className="logoLogIn logo2"src={logo} alt="logo..." /></a>
           
           <Form onSubmit={handleSubmit}>
           <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <div className="d-flex p-2"></div>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className="d-flex p-2"></div>
            <Button disabled={loading} className="w-100 button" type="submit">
              Log In
            </Button>
           </Form>
           <div className="d-flex p-2"></div>
            <div className="w-100 text-center mt-3">
                <Link className="link" to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
            <div class="d-flex p-2"></div>
           </Card.Body>
       </Card>
       </div>
       <div className="d-flex p-2"></div>
       <div className="w-100 text-center mt-2 regresar">
        ¿Aún no tienes cuenta? <Link className="link" to="/signup">Crear Cuenta</Link>
      </div>
      </>
  )
}