/* eslint-disable arrow-body-style */
import React from 'react'
import {Link} from 'react-router-dom'
import { Star } from '../styled';
// import {SearchCard} from '../styled'
import {ShowCardStyled} from './ShowCard.styled'

const ShowCard = ({ id, image, name, summary,onClickStar,isStarred }) => {
    const summaryAsText = summary
      ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, "")}...`
      : 'No description';
  
    return (
      <ShowCardStyled>
        <div className='img-wrapper'>
          <img src={image} alt="show" />
        </div>
  
        <h1>{name}</h1>
  
        <p>{summaryAsText}</p>
  
        <div className='btns'>
          <Link to={`/show/${id}`}>Read more</Link>
          <button type="button" onClick={onClickStar}>|<Star active={isStarred} />|</button>
        </div>
      </ShowCardStyled>
    );
  };

export default ShowCard
