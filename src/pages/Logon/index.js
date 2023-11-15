import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logoGrande.png'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const response = await api.post('/login', { email, password }); // Envie email e senha

      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      localStorage.setItem('id', response.data.id);

      history.push(`/profile/${response.dataid}`);
    } catch (err) {
      alert('Falha no login, tente novamente.');

  
    }
  }


  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

      <form onSubmit={handleLogin}>
        <h1> Faça seu Logon </h1>
        <input placeholder="Seu e-mail" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
       
        <input type='password' placeholder="Sua senha" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>

        <button className="button" type="submit"> Entrar </button>
        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041" />
          Não tenho cadastro
        </Link>
      </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}