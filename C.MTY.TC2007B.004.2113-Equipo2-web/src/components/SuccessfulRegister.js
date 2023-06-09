import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory, useParams } from "react-router-dom"
import Navbar from "./Navbar"

export default function SuccessfulRegister() {
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous"></link>
  const { id } = useParams();
  console.log("Página Successful Register: ", id)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      history.push("/registro-alumno")
    } catch {
      setError("Failed to register")
    }
    setLoading(false)
  }

  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Clave copiada: " + copyText.value);
  }

  return (
    < >
      <Navbar />
      <hr class="mt-0 mb-0" />
      <Card class="card">
        <Card.Body>
          <h2 className="text-center mb-4">¡Se ha registrado al alumno!</h2>
          <p className="text-center mb-4">Su clave es</p>
          <div>
            <div class="input">
          <input class="input" type="text" value={id} id="myInput" />
          </div>

          <div class="copy">
          <Button onClick={myFunction} variant="warning" class="copy"><i class="far fa-copy"></i></Button>
          </div>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button disabled={loading} className="w-100 button" type="submit" onClick={handleSubmit}>
            Registrar otro alumno
          </Button>
          <div class="d-flex p-2"></div>
          <div className="w-100 text-center mt-2">
        <Button href = "mailto: alumno@ejemplo.com" class="copy"><i class="far fa-envelope"></i></Button>
      </div>
        </Card.Body>
      </Card>
      <div class="d-flex p-2"></div>
      <div className="w-100 text-center mt-2">
        <Link class="link" to="/">Regresar a la página principal</Link>
      </div>
    </>
  )
}