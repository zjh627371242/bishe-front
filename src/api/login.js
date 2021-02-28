import http from "@/utils/http.js";

export default {
    login(params){
        return http.post('/user/login',params)
    }
};