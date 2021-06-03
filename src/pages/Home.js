/* eslint-disable arrow-body-style */
// eslint-disable-next-line
import React,{useState,useCallback} from 'react'
import ActorGrid from '../components/actors/ActorGrid';
import CustomRadios from '../components/CustomRadios';
import MainPage from '../components/MainPage'
import ShowGrid from '../components/show/ShowGrid';
import {apiGET} from '../misc/Config'
import {useLastQuery} from '../misc/custom-hooks'
import {SearchInput,SearchButtonWrapper,RadioInputsWrapper}from './Home.styled'

const renderResults=(results)=>{
    if(results && results.length===0){
       return <div>No results</div>;
    }
    if(results && results.length>0){
        return results[0].show ?
            // results.map(resultsContent => (
            //      <div key={resultsContent.show.id}>{resultsContent.show.name}</div>
            // ))
            <ShowGrid data={results} />
            :  <ActorGrid data={results} />
    }
    return null;
};

const Home = () => {
    const [input,setInput]=useLastQuery();
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

    const onRadioChange=useCallback((eventObject)=>{
        setSearchOption(eventObject.target.value); 
     },[])

    return (
        <MainPage>
            <SearchInput type='text' value={input} onChange={onInputChange} onKeyDown={keyDown}  placeholder='Search for somthing' />
            <RadioInputsWrapper>
                <div>
                    <CustomRadios
                    label="Shows" 
                    id='shows-search' 
                    checked={isShowSearch} 
                    value='shows' 
                    onChange={onRadioChange} />
                </div> 
                <div>
                <CustomRadios
                    label="Actors" 
                    id='actors-search' 
                    checked={!isShowSearch} 
                    value='people'
                    onChange={onRadioChange} />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type='button' onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults(results)}
        </MainPage>
    )
}

export default Home
