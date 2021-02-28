import http from "@/utils/http.js";

export default {
    list(params){
        return http.post('/workloadTotal/list',params)
    }
};