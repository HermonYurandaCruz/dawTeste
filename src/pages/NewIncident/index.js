import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [place, setPlace] = useState('')
  const [typeOfFood, setTypeOfFood] = useState('')
  const [horario, setHorario] = useState('')

  const history = useHistory()
  
  const ongId = localStorage.getItem('id')
  
  async function handleNewIncident(e) {
    e.preventDefault()
    const data = {
      name,
      email,
      contact,
      place,
      typeOfFood,
      horario,
    }

    console.log({
       name,
      email,
      contact,
      place,
      typeOfFood,
      horario,
    })
    try {
      await api.post('/restaurante', data, {
        headers: {
          Authorization: ongId,
        }
      })
      
      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastrar Novo Restaurante </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Nome do Restaurante" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Contacto" value={contact} onChange={(e) => setContact(e.target.value)} />
          <input type="text" placeholder="Local" value={place} onChange={(e) => setPlace(e.target.value)} />
          <input type="text" placeholder="Tipo de Comida" value={typeOfFood} onChange={(e) => setTypeOfFood(e.target.value)} />
          <input type="text" placeholder="Horário" value={horario} onChange={(e) => setHorario(e.target.value)} />
          <button type="submit">Adicionar Restaurante</button>
        </form>
      </div>
    </div>
  )
}

