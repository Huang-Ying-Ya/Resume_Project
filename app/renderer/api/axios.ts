
import axios from 'axios'
import { Encryption,Decryption} from "@src/common/utils/jsencrypt";
 
var request = axios.create({
    baseURL:'http://localhost:9091',//基准地址
    timeout:5000
})
// axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
//拦截请求
request.interceptors.request.use((config)=>{
    // if(localStorage.getItem('token')!= null){
    //     let token =Decryption(localStorage.getItem('token')||'');
    //     const headers = {
    //         Authorization:token
    //     }
    // }
    config.headers['Authorization'] = `Bearer ${Decryption(localStorage.getItem('token')||'')}`;
    // config.headers['x-csrf-token'] = `Bearer ${Decryption(localStorage.getItem('token')||'')}`;
    return config;
})
//拦截响应
request.interceptors.response.use((response)=>{
    return response
},function (error){
    //对响应的错误做点什么
    return Promise.reject(error);
    }
)

export default request;