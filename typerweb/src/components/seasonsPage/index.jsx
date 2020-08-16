import React, {useEffect} from 'react';
import Axios from 'axios';


const SeasonsPage = () =>
{
    
    useEffect( () =>
    {
        Axios.get("https://localhost:44340/api/season").then(res =>
        {
            const x = res.data;
        })
    });
    return(
        {}
    )

}

export default SeasonsPage