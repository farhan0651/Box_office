/* eslint-disable arrow-body-style */
import React from 'react'
import {ActorCardStyled} from './ActorCard.styled'

const ActorCard = ({ image, name, gender, country, birthday, deathday }) => {
    return (
      <ActorCardStyled>
        <div className='img-wrapper'>
          <img src={image} alt="actor" />
        </div>
        <h1>
          {name} {gender ? `(${gender})` : null}
        </h1>
        <p>{country ? `Comes from ${country}` : 'No country known'}</p>
        {birthday ? <p>Born on {birthday}</p> : null}
        <p>{deathday ? `Died on ${deathday}` : 'Alive'}</p>
      </ActorCardStyled>
    );
  };

export default ActorCard
