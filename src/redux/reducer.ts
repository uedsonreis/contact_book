import { combineReducers } from 'redux'
import { Action, ADD_CONTACT, LOGIN_FAILURE, LOGOUT, REMOVE_CONTACT, UPDATE_CONTACT, UPDATE_USER, SET_CONTACTS } from './actions'

function merge(prev: any, next: any) {
    return Object.assign({}, prev, next)
}

function contactsReducer(state = [], action: Action) {
    switch(action.type) {
        case SET_CONTACTS:
            return [...action.payload]

        case ADD_CONTACT:
            return [...state, action.payload]
    
        case UPDATE_CONTACT:
            return state.map((c: any) => (c.id === action.payload.id) ? action.payload : c)
    
        case REMOVE_CONTACT:
            return state.filter((c: any) => c.id !== action.payload.id)
    
        default: return state
    }
}

function userReducer(state = {}, action: Action) {
    switch(action.type) {
        case UPDATE_USER: return merge(state, action.payload)
        case ADD_CONTACT: return merge(state, { lastContact: action.payload })
        case LOGIN_FAILURE: return merge(state, { error: action.payload })
        case LOGOUT: return {}
        default: return state
    }
}

export default combineReducers({
    user: userReducer,
    contacts: contactsReducer
})