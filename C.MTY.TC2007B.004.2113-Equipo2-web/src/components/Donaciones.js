import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import Navbar from "./Navbar";

export default function Donaciones() {
  const alumnoRef = useRef()
  const cantidadRef = useRef()
  const { registrarDonacion } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      //console.log(alumnoRef.current.value, cantidadRef.current.value)
      await registrarDonacion(alumnoRef.current.value, cantidadRef.current.value) // -> función para registrar alumno
      setMessage("¡Gracias por tu donación!")
      history.push("/")
    } catch {
      setError("Failed to register")
    }
    setLoading(false)
  }

  return (
    < >
      <Navbar />
      <hr class="mt-0 mb-0" />
      <Card class="card">
        <Card.Body>
          <h1 className="donacionesHeading">Registrar Donaciones de alumnos</h1>
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Clave del alumno" ref={alumnoRef} required />
              </div>
              <div class="col">
                <input type="text" className="form-control" placeholder="Cantidad de donaciones" ref={cantidadRef} />
              </div>
            </div>
            <div class="d-flex p-2"></div>
            <Button disabled={loading} className="registro w-40 button3" type="submit">
              Registrar Donación
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="d-flex p-2"></div>
      <div className="w-100 text-center mt-2">
        <Link className="link" to="/">Regresar a la página principal</Link>
      </div>
    </>
  )
}