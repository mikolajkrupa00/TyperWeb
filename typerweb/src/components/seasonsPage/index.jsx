import React, {useEffect} from 'react';
import Axios from 'axios';


const SeasonsPage = () =>
{
    
    useEffect( () =>
    {
        Axios.get("/season").then(res =>
        {
        })
    });
    return(
        <div>asd</div>
    )

}

export default SeasonsPage