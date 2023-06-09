import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";



export default function Puntaje() {
    const [data, setData] = useState([])

    useEffect(() => {

        async function TableFunc(){
            var arr = [];
            var i = 0;
            const querySnapshot = await getDocs(collection(db, "Students"));
            querySnapshot.forEach((doc) => {
              arr[i] = [];
              console.log(doc.id, " => ", doc.data());
              arr[i] = doc.data();
              //arr[i]["id"] = doc.id;
              i++;
            });
            console.log('Hola Crayola 2')
            console.log(arr);
            setData(arr)
        }
        TableFunc()
    },[]);

    return (
        <>
            <Navbar />
            <hr class="mt-0 mb-0" />
            <div class="d-flex p-2"></div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="tableRow">
                            <TableCell className="data">Nombre</TableCell>
                            <TableCell className="data">Puntaje Individual</TableCell>
                            <TableCell className="data">Equipo</TableCell>
                            <TableCell className="data">Donaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((dato, index) => (
                        <TableRow  key= {index}>

                        <TableCell className="data">
                        { dato.name }
                        </TableCell>
                        <TableCell className="data">
                        { dato.points }
                        </TableCell>
                        <TableCell className="data">
                        { dato.team }
                        </TableCell>
                        <TableCell className="data">
                        { dato.donations }
                        </TableCell>
                            
                        </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}