import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTER from "../constants/router";
export function getToken(code:any){
    const navigate = useNavigate()
    console.log('getToken被调用了');
    if(code===40100) {
        message.error('用户登录信息过期，请重新登录');
        setTimeout(() => {
            navigate(ROUTER.login);
          }, 3000); 
    }
}