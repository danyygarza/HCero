import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from "./Navbar"
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

export default function RegistroAlumno() {
  const alumnoRef = useRef()
  const equipoRef = useRef()
  const { registrarAlumno } = useAuth() // -> función para registrar alumno
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [data, setData] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      const clave = await registrarAlumno(alumnoRef.current.value, equipoRef.current.value) // -> función para registrar alumno
      //console.log("Clave después de registrar: ", clave)
      history.push(`/successful-register/${clave}`)
    } catch {
      setError("Failed to register")
    }
    setLoading(false)
  }

  useEffect(() => {
    async function EquiposDisp() {
      var arr = [];
      var i = 0;
      const q = query(collection(db, "Teams"), where("n_students", "<", 5));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        arr[i] = [];
        arr[i] = doc.id;
        i++;
      });
      arr.sort(function (a, b) { return a - b });
      //console.log(arr);
      if (arr.length === 0) {
        var teams = [];
        i = 0;
        const querySnapshot = await getDocs(collection(db, "Teams"));
        querySnapshot.forEach((doc) => {
          teams[i] = [];
          //console.log(doc.id, " => ", doc.data());
          teams[i] = doc.id;
          i++;
        });
        teams.sort(function (a, b) { return a - b });
        //console.log(teams);
        var newTeam = parseInt(teams[teams.length - 1]) + 1
        console.log("newTeam", newTeam)
        await setDoc(doc(db, "Teams", newTeam.toString()), {
          total_donations: 0,
          total_points: 0,
          n_students: 0
        });
        arr[0] = [];
        arr[0] = newTeam;
        newTeam = parseInt(teams[teams.length - 1]) + 2
        //console.log("newTeam", newTeam)
        await setDoc(doc(db, "Teams", newTeam.toString()), {
          total_donations: 0,
          total_points: 0,
          n_students: 0
        });
        arr[1] = [];
        arr[1] = newTeam;
        newTeam = parseInt(teams[teams.length - 1]) + 3
        //console.log("newTeam", newTeam)
        await setDoc(doc(db, "Teams", newTeam.toString()), {
          total_donations: 0,
          total_points: 0,
          n_students: 0
        });
        arr[2] = [];
        arr[2] = newTeam;
      }
      setData(arr)
    }
    EquiposDisp()
  }, []);

  return (
    < >
      <Navbar />
      <hr class="mt-0 mb-0" />
      <Card className="card">
        <Card.Body>
          <div class="d-flex p-1"></div>
          <h2 className="text-center mb-4">Registro de alumno</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div class="d-flex p-1"></div>
            <Form.Group id="alumno">
              <Form.Label>Nombre del alumno</Form.Label>
              <Form.Control ref={alumnoRef} required
              />
            </Form.Group>
            <div class="d-flex p-1"></div>
            <Form.Group id="equipo">
              <label class="textEquipo mr-sm-2" for="inlineFormCustomSelect">Número de Equipo</label>
              <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" ref={equipoRef}>
                <option selected>Equipo</option>
                {data.map((dato, index) => (
                  <option>{ dato}</option>
                ))}
              </select>
            </Form.Group>
            <div class="d-flex p-2"></div>
            <Button disabled={loading} className="w-100 button" type="submit">
              Registrar
            </Button>
            <div class="d-flex p-1"></div>
          </Form>
        </Card.Body>
      </Card>
      <div class="d-flex p-2"></div>
      <div className="w-100 text-center mt-2 regresar">
        <Link class="link" to="/">Regresar</Link>
      </div>

    </>
  )
}