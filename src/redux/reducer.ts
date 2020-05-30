import { combineReducers } from 'redux'
import { UPDATE_USER, ADD_CONTACT, UPDATE_CONTACT, REMOVE_CONTACT, Action } from './actions'

function merge(prev: any, next: any) {
    return Object.assign({}, prev, next)
}

function contactsReducer(state = [], action: Action) {
    const contact = action.payload
    
    if (action.type === ADD_CONTACT) {
        return [...state, contact]
    }
    
    if (action.type === UPDATE_CONTACT) {
        return state.map((c: any) => (c.id === contact.id) ? contact : c)
    }
    
    if (action.type === REMOVE_CONTACT) {
        return state.filter((c: any) => c.id !== contact.id)
    }

    return state
}

function userReducer(state = {}, action: Action) {
    switch(action.type) {
        case UPDATE_USER: return merge(state, action.payload)
        case ADD_CONTACT: return merge(state, { lastContact: action.payload })
        default: return state
    }
}

export default combineReducers({
    user: userReducer,
    contacts: contactsReducer
})