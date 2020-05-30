export const UPDATE_USER = 'UPDATE_USER'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'

export interface Action {
    type: string
    payload: any
}

class ActionFactory {

    public createUpdateUser(update: any): Action {
        return { type: UPDATE_USER, payload: update }
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