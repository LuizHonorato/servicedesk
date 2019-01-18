const userKey = '_servicedesk_user'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_VALIDATED':
            if(action.payload) {
                return {...state, validToken: true}
            } else {
                localStorage.removeItem(userKey)
                return {...state, validToken: false, user: null}
            }
        default:
            return state
    }
}