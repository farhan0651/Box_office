/* eslint-disable arrow-body-style */
import React from 'react'
import ImageNotFound from '../../images/not-found.png'
import {CastList} from  './Cast.styled'

const Cast = ({ cast }) => {
    return (
      <CastList>
        {cast ? cast.map(({ person, character, voice }, key) => (
          <div key={key} className='cast-item' >
            <div className='pic-wrapper'>
              <img
                src={person.image ? person.image.medium : ImageNotFound}
                alt="cast-person"
              />
            </div>
            <div>
              <span className='actor'>
                <span className='bold'> {person.name} </span> | {character.name} {voice ? '| Voice' : ''}
              </span>
            </div>
          </div>
        )) : null}
      </CastList>
    );
  };

export default Cast
