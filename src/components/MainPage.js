/* eslint-disable arrow-body-style */
import React from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPage = ({children}) => {
    return (
        <div>
            <Title title="Box Office" subtitle="Are you looking for movies or actors?" />
            <Navs/>
            {children}
        </div>
    )
}

export default MainPage
