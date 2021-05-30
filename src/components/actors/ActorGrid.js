/* eslint-disable arrow-body-style */
import React from 'react'
import ActorCard from './ActorCard'
import ImageNotFound from '../../images/not-found.png'
import {FlexGrid} from '../styled'

const ActorGrid = ({data}) => {
    return (
        <FlexGrid>
            {
                data.map(({person})=>(
                <ActorCard key={person.id} id={person.id} name={person.name}
                 country={person.country ? person.country.name : null} gender={person.gender} deathday={person.death} 
                 image={person.image ? person.image.medium : ImageNotFound}
                 birthday={person.birthday}
                 />
            ))
            }   
        </FlexGrid>
    )
}

export default ActorGrid
