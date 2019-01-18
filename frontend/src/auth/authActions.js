import axios from 'axios'
import consts from '../consts'

export  function signin(email, password) {
    return dispatch => {
        axios.post(`${consts.API_URL}/signin`, {email, password})
            .then(res => {
                dispatch([
                    {type: 'USER_FETCHED', payload: res.data}
                ])
            })
            .catch(e => console.log(e))
    }
}

export function logout() {
    return {type: 'TOKEN_VALIDATED', payload: false}
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.API_URL}/validateToken`, {token})
                .then(res => {
                    dispatch({type: 'TOKEN_VALIDATED', payload: res.data.valid})
                })
                .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
        } else {
            dispatch({type: 'TOKEN_VALIDATED', payload: false})
        }
    }
}