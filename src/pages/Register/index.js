import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()
    
    const data = {
      name,
      email,
      city,
      password,
    }
    
    try {
      const response = await api.post('users', data)
    
      localStorage.setItem('userName',name);
      history.push('/')


    } catch (err) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastro </h1>
          <p> Faça seu cadastro, entre na plataforma e encontre as melhores opcoes de restaurantes. </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="input-group">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: 80 }} />
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}