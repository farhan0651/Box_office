import React from 'react'
import {Link} from 'react-router-dom'

// eslint-disable-next-line arrow-body-style
const Navs = () => {
    const Links=[
    {to:'/',text:'Home'},
    {to:'/starred',text:'Starred'}]

    return (
        <div>
            <ul>
                {Links.map(content=>(
                    <li key={content.to}><Link to={content.to}>{content.text}</Link></li>
                ))}
            </ul>
        </div>
    );
}

export default Navs
