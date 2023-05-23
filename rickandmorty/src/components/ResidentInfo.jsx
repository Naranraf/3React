
import axios from 'axios'
import { useState, useEffect } from 'react'

const ResidentInfo = ({ url }) => {

    const [ resident, setResident ] = useState( {} )

    useEffect( () => {
        axios
        .get( url )
        .then( resp => setResident(resp.data) )
        .catch( error => console.error(error) )
    }, [] )

    return (
        <div className="residentInfo-card">
            <h1>{ resident?.name }</h1>
            <img src={ resident?.image } alt="" />
        </div>
    );
};

export default ResidentInfo;