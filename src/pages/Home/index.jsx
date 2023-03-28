import React, { useState, useEffect } from 'react';
import './style.css';

import {Card} from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Will1anBorges')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src="https://picsum.photos/200/300" alt="Foto de Perfil" />
        </div>
      </header>
      
      <input 
        type="text" 
        placeholder="Digite o seu nome..."
        onChange= {e => setStudentName(e.target.value)}
      />
       
      <button 
        type="button" onClick= {handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key= {student.time} //chave unica de cada card criado, geralmente usado com ID
            name= {student.name} 
            time= {student.time}
          />
        ))
      }
      
    </div>
  )
}

