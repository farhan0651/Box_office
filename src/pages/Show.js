/* eslint-disable arrow-body-style */
import React,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import { apiGET } from '../misc/Config';

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
        <div>
            This page shows
        </div>
    )
}

export default Show
