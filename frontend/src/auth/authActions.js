import axios from 'axios'
import consts from '../consts'

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.API_URL}/validateToken`, {token})
                .then(resp => {
                    dispatch({type: 'TOKEN_VALIDATED', payload: resp.data.valid})
                })
                .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
        } else {
            dispatch({type: 'TOKEN_VALIDATED', payload: false})
        }
    }
}