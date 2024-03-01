import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [apiData, setApiData] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() =>{
    const socket = io('https://websocketproyect.onrender.com');

    socket.on('apiEvent', (data) => {
      socket.on("connect", () => {
        console.log("conectado al socket.io");
        setIsConnected(true);
      });
      setMessages((messages) => [...messages,data]);
      console.log('SOCKET',messages)
      console.log('TIPOS DEL SOCKET',typeof(messages))
    });
      
    return () =>{
      socket.off("connect");
      socket.disconnect();
    };
  }, []);



  const arregloString = messages.map(obj => JSON.stringify(obj))
  console.log('ARREGL',arregloString)
  const ultimoMScoket = arregloString.slice(-1)[0]
  console.log('TIPO FINAL',typeof(ultimoMScoket),'ULTIMOOO ==>',ultimoMScoket)




  const handleApiFetch = async () => {
    console.log('click')
    const service = {
      name: "PAGO"
    };
    try {
      const response = await fetch('https://apipaymentts.onrender.com/service', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(service)
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al realizar la solicitud.');
      }

      const jsonData = await response.json();
      setApiData(jsonData);
      console.log('TIPO APIDATAAA',typeof(apiData))
      console.log('APIDATAAAAA',apiData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className='cont'>
    <h1>Proyecto Arquitectura Event-Driven</h1>
     <hr/>
     <p>
     </p>
     <h2>Genera Evento</h2>
     <button type='button' onClick={handleApiFetch} >
      Evento
     </button>
     <pre>{JSON.stringify(apiData,null,2)}</pre>
     <hr/>
     <h2>WEB SOCKET</h2>
        <h3>Ultimo movimiento</h3>
      <hr/>
      {messages.map((mensaje, index) =>(
        <div key={index}>
        <p >{mensaje.name}</p>
        <p>Estado: {mensaje.payed ? 'Completado' : 'Incompleto'}</p>
        </div>
      )).reverse()}
    </div>
  )
}

export default App
