import {useReducer,useEffect,useState,useCallback} from 'react'
import {apiGET} from './Config'
 
function showsReducer(previousState,action){
    switch(action.type){
        case 'ADD':{
        return [...previousState,action.showId]}
        case 'Remove':{
            return previousState.filter(showId=>showId!==action.showId)
        }
        default: return previousState
    }
}

function UserPersistedReducer(reducer,initialState,key){
    
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) :initial
    })
    
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state,key])
    
    return [state,dispatch];
}

export function  useShows(key = 'shows'){
    return UserPersistedReducer(showsReducer,[],key);
}


export function useLastQuery(key ='lastQuery'){
    const [input,setInput]=useState(()=>{
    const persisted=sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) :''
    });

    const setPersistedInput=useCallback((newState)=>{
        setInput(newState);
        sessionStorage.setItem(key,JSON.stringify(newState))
    },[key])

    return [input,setPersistedInput];
}

export function useShow(showId){


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

    const [state,dispatch]=useReducer(reducer,{
        show:null,
        error:null,
        isLoading:true
    }
    );
    useEffect(()=>{
        let isMounted=true;
        apiGET(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(result=>{
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
    },[showId])
    return state;
}