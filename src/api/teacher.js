import http from "@/utils/http.js";

export default {
    list(params){
        return http.post('/teacher/list',params)
    },
    delete(params){
        return http.post('/teacher/delete',params)
    },
    getTeacherList(params){
        return http.post('/teacher/getTeacherList',params)
    },
    add(params){
        return http.post('/teacher/add',params)
    },
    detail(params){
        return http.post('/teacher/detail',params)
    },
    edit(params){
        return http.post('/teacher/edit',params)
    },
};