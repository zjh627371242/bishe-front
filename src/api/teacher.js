import http from "@/utils/http.js";

export default {
    list(params){
        return http.post('/teacher/list',params)
    },
    delete(params){
        return http.post('/teacher/delete',params)
    }
};