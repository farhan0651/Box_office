/* eslint-disable arrow-body-style */
import React from 'react'
import ImageNotFound from '../../images/not-found.png'
import { Star } from '../styled';
import {MainDataWrapper,Headline,TagList} from './ShowMainData.styled'

const ShowMainData = ({ name, rating, summary, tags, image }) => {
    return (
      <MainDataWrapper>
        <img src={image ? image.original : ImageNotFound} alt="show-cover" />
        <div className='text-side'>
          <Headline>
            <h1>{name}</h1>
            <div>   
              <Star active/>
              <span>{rating ? rating.average  : 'N/A'}</span>
            </div>
          </Headline>
          <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />
  
          <div>
            Tags:{' '}
            <TagList>
              {tags ? tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              )) : null}
            </TagList>
          </div>
        </div>
      </MainDataWrapper>
    );
  };
  

export default ShowMainData
