import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles-cards.css';

const Cards = ({ character }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div className='content-card' onClick={handleClick}>
      <article>
        <img src={character.image} alt={character.name} />
        <p>{character.name}</p>
        <span>{character.status}</span>
      </article>
    </div>
  );
};

export default Cards;