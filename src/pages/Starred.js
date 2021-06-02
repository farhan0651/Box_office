/* eslint-disable arrow-body-style */
import React,{useState,useEffect} from 'react'
import MainPage from '../components/MainPage'
import {useShows} from '../misc/custom-hooks'
import {apiGET} from '../misc/Config'
import ShowGrid from '../components/show/ShowGrid'

const Starred = () => {

    const [starred]=useShows();

    const [shows,setShows]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        if(starred && starred.length>0){
            const promises= starred.map(showId=> apiGET(`/shows/${showId}`));
            Promise.all(promises).then(apiResult=>apiResult.map(show=>({show})))
            .then(result=>{
                setShows(result);
                console.log(result);
                setIsLoading(false);
            })
            .catch(err=>{
                setError(err.message);
                setIsLoading(false);
            })
        }
        else{
            setIsLoading(false);
        }
    },[starred])

    return (
        <MainPage>
            {shows && !isLoading && !error && <ShowGrid data={shows} />}
            {isLoading && <div>The Shows are Loading</div>}
            {error && <div>Error Occured:{error}</div>}
            {!isLoading && !shows && <div>No starred show to display</div>}
        </MainPage>
    )
}

export default Starred
