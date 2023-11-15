import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FiPower,FiStar, FiShoppingCart,FiSearch } from 'react-icons/fi'
import axios from 'axios';

import api from '../../services/api'

import './styles.css'
import imagemRestaurante from '../../assets/restaurante1.png'


import logoImg from '../../assets/logo.svg'



export default function ComentariosDetalhes() {

  const [restaurante, setRestaurante] = useState([])
  const [comentario, setComentario] = useState([])

  const [description, setDescription] = useState('')
  const [star, setstar] = useState('')
  const nomeUsuario = localStorage.getItem('userName');

  const [pratos, setPratos] = useState([]);


  const { restauranteId } = useParams();

  async function handlComentario(e) {
    e.preventDefault()
    
    const data = {
      idUser:nomeUsuario,
      description,
      star,
      idRestaurante :restauranteId,
     
    }
    
    try {
   
      const response = await api.post('comentario', data)
      window.location.reload();

    } catch (err) {
      alert('Erro ao efectuar comentario, tente novamente')
    }
  }


  useEffect(() => {
    api.get(`/restaurantes/searchId?id=${restauranteId}`, {
      headers: {
        Authorization: restauranteId,
      }
    }).then(response => {
      setRestaurante(response.data)
    })
  }, [restauranteId]) 

  useEffect(() => {
    axios.get(`/menu/searchId?idRestaurante=${restauranteId}`)
      .then((response) => {
        setPratos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar pratos:', error);
      });
  }, []);


  useEffect(() => {
    api.get(`/comentario/searchId?idRestaurante=${restauranteId}`)
      .then(response => {
        setComentario(response.data);
      })
      .catch(error => {
        // Trate erros, se houver algum
      });
  }, [restauranteId]);

  return (
    <div className="restaurante-container">

      {restaurante.map(restaurante => (
          <li key={restaurante.id}>
            <h1> {restaurante.name} </h1>
            <img  src={imagemRestaurante} alt="Restaurante 1" />

            <h3> {restaurante.typeOfFood} </h3>

            <strong> Local: </strong>
            <p> {restaurante.place} </p>
            
            <strong> Horario: </strong>
            <p> {restaurante.horario} </p>

            <strong> Contacto: </strong>
            <p> {restaurante.contact} </p>

          </li>
          
        ))}

<div>
      <h2>Menu do Restaurante</h2>
      <table>
        <thead>
          <tr>
            <th>Nome do Prato</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Acoes</th>

          </tr>
        </thead>
        <tbody>
          {pratos.map((prato) => (
            <tr key={prato.id}>
              <td>{prato.namePrato}</td>
              <td>{prato.description}</td>
              <td>{prato.valor}</td>
              <td>
                <button  ><FiShoppingCart /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        <div className='comentario'>
        {comentario.map(comentario => (
                  <li key={comentario.id}>
                    <strong>{comentario.name}</strong>
                    <h3> {comentario.idUser} </h3>

                    <p> {comentario.description} </p>
                
                    <div className="star-rating">
                        <p>{comentario.star}</p>
                        <FiStar size={20} color="#a8a8b3" />
                  </div>
                  </li>
                ))}
        </div>

        <div>
        

    <form onSubmit={handlComentario}>
        <input placeholder="Comentar aqui" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        
        <select id="estrela" value={star} onChange={(e) => setstar(e.target.value)}>
          <option value="">Selecione o número de estrelas</option>
          <option value="1">1 estrela</option>
          <option value="2">2 estrelas</option>
          <option value="3">3 estrelas</option>
          <option value="4">4 estrelas</option>
          <option value="5">5 estrelas</option>
        </select>
        <button type="submit">Enviar Comentário</button>
    </form>
        </div>
      

    </div>
  )
}