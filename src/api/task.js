import http from "@/utils/http.js";

export default {
    list(params){
        return http.post('/workload/list',params)
    },
    delete(params){
        return http.post('/workload/delete',params)
    },
    save(params){
        return http.post('/workload/save',params)
    },
    getOne(params){
        return http.post('/workload/getOne',params)
    },
    update(params){
        return http.post('/workload/update',params)
    }
};