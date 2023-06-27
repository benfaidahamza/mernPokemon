import Navbar from '../Navbar/Navbar'
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/pok.png';
import './Accueil.css' 

function Accueil() {
  return (
    <>
    <div className="home">
        <Navbar></Navbar> 
      <div className="content">
        <h1 className='stylish-text'>Bienvenue sur notre site</h1>
        <div className="centered-content">
          <div className="buttons">
          </div>
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
    </>
  );
}

export default Accueil;