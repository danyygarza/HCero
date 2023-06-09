import React, { useState, useEffect } from 'react'
import Navbar
    from './Navbar'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export default function Equipos() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function TableFunc() {
            var arr = [];
            var i = 0;
            const querySnapshot = await getDocs(collection(db, "Teams"));
            querySnapshot.forEach((doc) => {
                arr[i] = [];
                arr[i] = doc.data();
                arr[i]["id"] = doc.id;
                i++;
            });
            console.log(arr);
            setData(arr)
        }
        TableFunc()
    }, []);

    return (
        <>
            <Navbar />
            <hr class="mt-0 mb-0" />
            <div class="d-flex p-2"></div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="tableRow">
                            <TableCell className="data">Equipo</TableCell>
                            <TableCell className="data">Donaciones Totales</TableCell>
                            <TableCell className="data">Puntos Totales</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((dato, index) =>(
                            <TableRow key = {index}>
                                <TableCell className="data">
                                    {dato.id}
                                </TableCell>
                                <TableCell className="data">
                                    {dato.total_donations}
                                </TableCell>
                                <TableCell className="data">
                                    {dato.total_points}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}