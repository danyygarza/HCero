import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "../firebase"
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { addDoc, serverTimestamp, doc, updateDoc, increment, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    addDoc(collection(db, "Teachers"), {
      email: email,
      dateSignUp: serverTimestamp(),
    });
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
  }

  async function registrarAlumno(alumno, equipo) {
    const docu = await addDoc(collection(db, "Students"), {
      name: alumno,
      team: equipo,
      donations: 1,
      teacher: currentUser.email,
      date: serverTimestamp(),
      points: 100,
      color: " ",
      gender: "",
      key: ""
    });
    const clave = docu.id.slice(0, 6)
    const refID = doc(db, "Students", docu.id);
    await updateDoc(refID, {
      key: clave
    });
    //console.log("Document written with ID: ", docu.id);
    console.log(typeof equipo)
    const ref = doc(db, "Teams", equipo);
    await updateDoc(ref, {
      total_donations: increment(1),
      total_points: increment(100),
      n_students: increment(1)
    });
    return clave;
  }

  async function registrarDonacion(clave, donaciones) {
    const q = query(collection(db, "Students"), where("key", "==", clave));
      const querySnapshot = await getDocs(q);
      var key = ""
      var team = ""
      querySnapshot.forEach((doc) => {
  //console.log(doc.id, " => ", doc.data());
        key = doc.id
        //console.log(doc.id, " => ", doc.data());
        //console.log(doc.id, " => ", doc.data().team);
        team = doc.data().team
        //console.log(team)
      });
//console.log(key)
      const ref = doc(db, "Students", key);
        await updateDoc(ref, {
          donations: increment(donaciones)
      });
      const refTeam = doc(db, "Teams", team);
        await updateDoc(refTeam, {
          total_donations: increment(donaciones),
          total_points: increment(donaciones*100)
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    registrarAlumno,
    registrarDonacion,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}