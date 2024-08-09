
export const initialState = {
    PasswordVisible: false,
    ConPasswordVisible: false,
    PassValue: '', 
    ConPassValue: '',
    EmailValue: '',
    Valid: false,
    ErrMsg: false
}


export const ACTIONS = {
    PASS_VISIBLE: 'PasswordVisible',
    CON_PASS_VISIBLE: 'ConPasswordVisible',
    PASS_VALUE: 'PassValue',
    CON_PASS_VALUE: 'ConPassValue',
    EMAIL_VALUE: 'EmailValue',
    ERR_MSG: 'ErrMsg'
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.PASS_VISIBLE:
            return { ...state, PasswordVisible: !state.PasswordVisible }
        case ACTIONS.CON_PASS_VISIBLE:
            return { ...state, ConPasswordVisible: !state.ConPasswordVisible }
        case ACTIONS.PASS_VALUE:
            return { ...state, PassValue: action.payload }
        case ACTIONS.CON_PASS_VALUE:
            return { ...state, ConPassValue: action.payload }
        case ACTIONS.EMAIL_VALUE:
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return { ...state, EmailValue: action.payload, Valid: emailPattern.test(action.payload), ErrMsg: null }
        case ACTIONS.ERR_MSG:
            return { ...state, ErrMsg: action.payload }
        default:
            return state
    }
}


export default reducer