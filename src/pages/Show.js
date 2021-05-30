/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainDetails from '../components/show/ShowMainDetails';
import { apiGET } from '../misc/Config';
import {ShowPageWrapper,InfoBlock} from './Show.styled'

const reducer=(previusState,action)=>{
    switch(action.type){
        case 'FetchSuccesfull':{
            return{show:action.show,error:null,isLoading:false}
        }
        case 'FetchFailed':{
            return{...previusState,error:action.error}
        }
        default: return previusState;
    }
}

const initialState ={
    show:null,
    error:null,
    isLoading:true
}

const Show = () => {
    const {id}=useParams();
    const [{show,error,isLoading},dispatch]=useReducer(reducer,initialState);

    useEffect(()=>{
        let isMounted=true;
        apiGET(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result=>{
                if(isMounted){
                dispatch({type:'FetchSuccesfull',show:result})
        }})
        .catch(err=>{
            if(isMounted){
                dispatch({type:'FetchFailed',error:err.message})
            }
        })
        return ()=>{
            isMounted=false;
        }
    },[id])

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
