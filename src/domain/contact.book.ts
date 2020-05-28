import { Contact } from './contact'
import api from '../api/randomuser.me'
// import * as util from '../utils'

class ContactBook {

    private contacts: Contact[] = []

    public async getContacts(): Promise<Contact[]> {
        if (this.contacts.length < 1) {
            // this.contacts = util.getContactList()
            this.contacts = await api.getContacts()
        }
        return this.contacts
    }

    public add(contact: Contact): void {
        contact.id = this.contacts.length
        this.contacts.push(contact)
    }

}

export default new ContactBook()