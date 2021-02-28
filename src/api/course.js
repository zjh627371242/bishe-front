import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/course/add',params)
    },
    list(params){
        return http.post('/course/list',params)
    },
    delete(params){
        return http.post('/course/delete',params)
    },
    detail(params){
        return http.post('/course/detail',params)
    },
    edit(params){
        return http.post('/course/edit',params)
    },
    getCourseList(params){
        return http.post('/course/getCourseList',params)
    },
};
