import axios from 'axios';

const setupAxiosInterceptors = () =>
{
    axios.interceptors.request.use(config =>{
        //config.headers['Accept']='application/json';
        //config.headers['Content-Type']='application/json';
        if(config.url[0]==='/')
        {
            config.url=`https://localhost:44340/api${config.url}`
            console.log(config.url);
            console.log(config.headers);
            return config;
        }
    })
}

export {setupAxiosInterceptors};