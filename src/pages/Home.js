/* eslint-disable arrow-body-style */
// eslint-disable-next-line
import React,{useState} from 'react'
import MainPage from '../components/MainPage'
import {apiGET} from '../misc/Config'

const Home = () => {
    const [input,setInput]=useState('');
    const [results,setResults]=useState(null);
    const [searchOption,setSearchOption]=useState('shows');
    const isShowSearch=searchOption==='shows';

    const onInputChange=(eventObject)=>{
        setInput(eventObject.target.value);
    }
    const onSearch=()=>{
        apiGET(`/search/${searchOption}?q=${input}`).then(result=>{
            setResults(result);
        })
    }

    const keyDown=(env)=>{
        if(env.keyCode===13)
            onSearch();
    }

    const renderResults=()=>{
        if(results && results.length===0){
           return <div>No results</div>;
        }
        if(results && results.length>0){
            return results[0].show ?
                results.map(resultsContent => (
                     <div key={resultsContent.show.id}>{resultsContent.show.name}</div>
                ))
                : results.map(resultsContent => (
                    <div key={resultsContent.person.id}>{resultsContent.person.name}</div>
               ))
        }
        return null;
    };

    const onRadioChange=(eventObject)=>{
       setSearchOption(eventObject.target.value); 
    }

    return (
        <MainPage>
            <input type='text' value={input} onChange={onInputChange} onKeyDown={keyDown}/>
            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input id='shows-search' type='radio' checked={isShowSearch} value='shows' onChange={onRadioChange} />
                </label>
                <label htmlFor='peoples-search'>
                    Actors
                    <input id='peoples-search' type='radio' checked={!isShowSearch} value='people' onChange={onRadioChange} />
                </label>
            </div>
            <button type='button' onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPage>
    )
}

export default Home
