import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './character.css'

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <div>Cargando...</div>;
    }

    const handleClick = () => {
        navigate(`/`);
    };

    return (
        <div className='content-character'>
            <div>
                <img src='/assets/img/img-ricknMorty.png' alt='Logo rick n morty' />
            </div>
            <div className='character'>
                <div className='button'>
                    <button onClick={handleClick}>Volver ←</button>
                </div>
                <section>
                    <div className='info-character'>
                        <h1>{character.name}</h1>
                        <img src={character.image} alt={character.name} />
                        <div>
                            <p><strong> Status:</strong> {character.status}</p>
                            <p><strong>Species:</strong> {character.species}</p>
                            <p><strong>Gender:</strong> {character.gender}</p>
                            <p><strong>Location:</strong> {character.location.name}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CharacterDetail;