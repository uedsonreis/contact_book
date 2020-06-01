import authService from '../api/auth.service'

export const UPDATE_USER = 'UPDATE_USER'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export const SET_CONTACTS = 'SET_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'

export interface Action {
    type: string
    payload?: any
}

class ActionFactory {

    public createLogin = (username: string, password: string) => (dispatch: any) => {
        authService.authenticate(username, password).then((token: string | null) => {
            if (token) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { username, token, error: undefined }
                })
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: 'Username or password is invalid!'
                })
            }
        }).catch((error: any) => {
            console.error(error)
            dispatch({ type: LOGIN_FAILURE, payload: error.message })
        })
    }

    public createLogout(): Action {
        return { type: LOGOUT }
    }

    public createUpdateUser(update: any): Action {
        return { type: UPDATE_USER, payload: update }
    }
    
    public createSetContacts(contacts: any[]): Action {
        return { type: SET_CONTACTS, payload: contacts }
    }

    public createAddContact(contact: any): Action {
        return { type: ADD_CONTACT, payload: contact }
    }

    public createUpdateContact(contact: any): Action {
        return { type: UPDATE_CONTACT, payload: contact }
    }

    public createRemoveContact(contact: any): Action {
        return { type: REMOVE_CONTACT, payload: contact }
    }
}

export const actionFactory = new ActionFactory()