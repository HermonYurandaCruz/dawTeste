import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower,FiMessageSquare, FiInfo } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import imagemRestaurante from '../../assets/restaurante1.png'

export default function Profile() {

  const [restaurante, setRestaurante] = useState([])
  const history = useHistory()
  const restauranteId = localStorage.getItem('id')
  const nomeUsuario = localStorage.getItem('userName');
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [typeOfFood, setTypeOfFood] = useState('');

  const realizarPesquisa = async () => {
    try {
      if (termoPesquisa.trim() !== '') {
        const response = await api.get(`/restaurantes/search?name=${termoPesquisa}`, {
          headers: {
            Authorization: restauranteId,
          }
        });
        setRestaurante(response.data);
      } else {
        const response = await api.get('restaurante', {
          headers: {
            Authorization: restauranteId,
          }
        });
        setRestaurante(response.data);
      }
    } catch (error) {
      // Trate erros, se houver algum
    }
  };

  // Use o useEffect para acionar a pesquisa quando termoPesquisa ou restauranteId mudar
  useEffect(() => {
    realizarPesquisa();
  }, [termoPesquisa, restauranteId]);




  const realizarPesquisaTypeFood = async () => {
    try {
      if (typeOfFood.trim() !== '') {
        const response = await api.get(`/restaurantes/searchTypeFood?typeOfFood=${typeOfFood}`, {
          headers: {
            Authorization: restauranteId,
          }
        });
        setRestaurante(response.data);
      } else {
        const response = await api.get('restaurante', {
          headers: {
            Authorization: restauranteId,
          }
        });
        setRestaurante(response.data);
      }
    } catch (error) {
      // Trate erros, se houver algum
    }
  };

  // Use o useEffect para acionar a pesquisa quando termoPesquisa ou restauranteId mudar
  useEffect(() => {
    realizarPesquisaTypeFood();
  }, [typeOfFood, restauranteId]);


  // async function handleDeleteIncident(id) {
  //   try {
  //     await api.delete(`restaurante/${id}`, {
  //       headers: {
  //         Authorization: restauranteId,
  //       }
  //     })
      
  //     setRestaurante(restaurante.filter(incident => incident.id !== id))
  //   } catch (err) {
  //     alert('Erro ao deletar caso, tente novamente.')
  //   }
  // }

  function handleComent(id){
    history.push(`/comentario/${id}`);
  }    



  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span> Bem-vindo/a, {nomeUsuario} </span>
      

        {/* <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link> */}
        
        <select id="typeOfFood" value={typeOfFood} onChange={(e) => setTypeOfFood(e.target.value)}>
        <option className='option' value="">Todo Tipo de comida</option>
        {restaurante.map((restaurante) => (
          <option key={restaurante.id} value={restaurante.typeOfFood}>
            {restaurante.typeOfFood}
          </option>
        ))}
      </select>         
       <input
            type="text"
            placeholder="Pesquisar Restaurante"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />          
           <button onClick={handleLogout} type="button">
          <FiPower size={18} color="e02041" />
        </button>
      </header>
      <h1> Restaurantes </h1>
      <ul className="card-list">
        {restaurante.map(restaurante => (
          <li key={restaurante.id} className="card">
            <div className="card-header">
            <strong> {restaurante.name} </strong>
            </div>

          
         <div className="card-body">
         <img  src={imagemRestaurante}  alt="Restaurante 1" />
            <strong> Local: </strong>
            <p> {restaurante.place} </p>        

         </div>
         <div>
        <strong> Horario: </strong>
            <p> {restaurante.horario} </p>
         
          </div>
           {/* <strong> VALOR Medio: </strong> */}
            {/* <p> {Intl.NumberFormat('pt-Mz', { style: 'currency', currency: 'MZN' }).format(incident.value)} </p> */}
    
            {/* <button onClick={() => handleDeleteIncident(restaurante.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button> */}
           
            <button onClick={() => handleComent(restaurante.id)} type="button">
              <FiInfo size={20} color="#a8a8b3" />
            </button>

          </li>
        ))}
      </ul>
    </div>
  )
}