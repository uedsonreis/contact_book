import { createStore } from 'redux'
import reducer from './reducer'
import { actionFactory } from './actions'

import api from '../api/randomuser.me'

const store = createStore(reducer)

api.getContacts().then(contacts => {
    for (let i=0; i<contacts.length; i++) {
        contacts[i].id = (i+1)
        store.dispatch(actionFactory.createAddContact(contacts[i]))
    }
})

export default store