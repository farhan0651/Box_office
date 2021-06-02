/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainDetails from '../components/show/ShowMainDetails';
// import { apiGET } from '../misc/Config';
import { useShow } from '../misc/custom-hooks';
import {ShowPageWrapper,InfoBlock} from './Show.styled'


const Show = () => {
    const {id}=useParams();
    const {show,isLoading,error}=useShow(id)



    console.log('show',show)

    if(isLoading){
        return(
            <div>The conent is Loading</div>
        );
    }
    if(error){
        return(<div>OOPS !...There was an error {error}</div>)
    }


    return (
        <ShowPageWrapper>
            <ShowMainDetails name={show.name} image={show.image} summary={show.summary} tags={show.tags} />
            <InfoBlock>
                <h2>Details</h2>
                <Details status={show.status} premiered={show.premiered} network={show.network} />
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast} />
            </InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show
