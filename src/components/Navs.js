import React from 'react'
import {useLocation} from 'react-router-dom'
import {NavList,LinkStyled} from './Navs.styled'

// eslint-disable-next-line arrow-body-style
const Navs = () => {
    const Links=[
    {to:'/',text:'Home'},
    {to:'/starred',text:'Starred'}]

    const location=useLocation();

    return (
        <div>
            <NavList>
                {Links.map(content=>(
                    <li key={content.to}><LinkStyled to={content.to} className={content.to === location.pathname ? 'active': ''} >
                        {content.text}</LinkStyled></li>
                ))}
            </NavList>
        </div>
    );
}

export default Navs
