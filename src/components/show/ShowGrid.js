/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable arrow-body-style */
import React,{useCallback} from 'react'
import ShowCard from './ShowCard'
import ImageNotFound from '../../images/not-found.png'
import {FlexGrid} from '../styled'
import {useShows} from '../../misc/custom-hooks'

const ShowGrid = ({data}) => {

    const [starredShows,dispatchStarred]=useShows()

    return (
        <FlexGrid>
            {
                data.map(({show})=>{

                    const isStarred=starredShows.includes(show.id);

                    const onClickStar=useCallback(()=>{
                        if(isStarred){
                            dispatchStarred({type:'Remove',showId:show.id})
                        }
                        else{
                            dispatchStarred({type:'ADD',showId:show.id})
                        }
    
                    },[isStarred,show.id])



                    return(
                    <ShowCard 
                    key={show.id} id={show.id} name={show.name} image={show.image ? show.image.medium : ImageNotFound } 
                        summary={show.summary} onClickStar={onClickStar} isStarred={isStarred}
                        />);
                    }
                )
        }
        </FlexGrid>
        )
};

export default ShowGrid
