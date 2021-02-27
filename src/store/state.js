
const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    user: {}
}


export default state
