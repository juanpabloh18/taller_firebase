import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import './crud.css'


const crud = () => {
    const [email, setEmail] = useState()
    const [nombre, setNombre] = useState()
    const [telefono, setTelefono] = useState()
    const [fetchdata, setFetchdata] = useState([])
    const [id, setId] = useState()

    const dbref = collection(db, "taller_firebase")

    const add = async () => {

        const addData = await addDoc(dbref, { Name: nombre, Email: email, Telefono: telefono })
       
    }

    const fetch = async () => {
        const snapshot = await getDocs(dbref)
        const fetchdata = snapshot.docs.map((doc => ({ id: doc.id, ...doc.data() })))
        setFetchdata(fetchdata)
        console.log(fetchdata)
    }

    useEffect(() => {
        fetch()

    }, [])

    const passData = async (id) => {
        const matchId = fetchdata.find((data) => {
            return data.id === id
        })
        setNombre(matchId.Name)
        setEmail(matchId.Email)
        setTelefono(matchId.Telefono)
        setId(matchId.id)


    }

    const update = async () => {
        const updateteref = doc(dbref, id)
        try {
            await updateDoc(updateteref, { Name: nombre, Email: email, Telefono: telefono })
           
            
        }
        catch (error) {
            alert(error, "no se actualizo")

        }

    }

    const del = async (id) => {
        const delref = doc(dbref, id)
        try {
            await deleteDoc(delref)
            
            
        }
        catch (error) {
            alert(error)
        }

    }





    return (
        <>
            <div className="form_container">
                <h2>Add/ Update Form</h2>
                <div className="box">
                    <input type="text" placeholder="nombre" autoComplete="off" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                </div>
                <div className="box">
                    <input type="email" placeholder="correo" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="box">
                    <input type="text" placeholder="numero" autoComplete="off" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                </div>
                <button onClick={async () => {
                    await add();
                    await fetch(); 
                }}>agregar</button>
                <button onClick={async () =>{
                    await update();
                    await fetch();
                }}>actualizar</button>
            </div>
            <div className="database">
                <h2 className="title_data">CRUD database</h2>
                <div className="container">
                    {
                        fetchdata.map((data) => {
                            return (
                                <>
                                    <div className="box">
                                        <h2>nombre: {data.Name}</h2>
                                        <h2>correo: {data.Email}</h2>
                                        <h2>Telefono: {data.Telefono}</h2>
                                        <button onClick={() => passData(data.id)}>actualizar</button>
                                        <button onClick={ async() => {
                                            await del(data.id);
                                            await fetch();
                                        }}>Eliminar</button>
                                    </div>
                                </>
                            )
                        })
                    }


                </div>

            </div>
        </>
    )
}

export default crud