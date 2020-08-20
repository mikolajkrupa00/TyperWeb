import React, {useEffect} from 'react';
import Axios from 'axios';


const SeasonsPage = () =>
{
    
    useEffect( () =>
    {
        console.log("asd");
        Axios.get("/season").then(res =>
        {
            console.log(res.data);
        })
    });
    return(
        <div>asd</div>
    )

}

export default SeasonsPage