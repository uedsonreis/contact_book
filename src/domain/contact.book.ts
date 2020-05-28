import { Contact } from './contact'

const NUM_CONTACTS = 100
const firstNames = [ 'Eddard', 'Tywin', 'John', 'Hector', 'Adam', 'Uedson', 'Winston', 'Mary', 'Lyanna', 'Edward', 'Daemon', 'Aegon', 'Lionel' ]
const lastNames = [ 'Smith', 'Lannister', 'Williams', 'Bull', 'Stark', 'Reis', 'Arryn', 'Reyne', 'Churchill', 'Windsor', 'Blackfyre', 'Targaryen', 'Messi' ]

class ContactBook {

    private contacts: Contact[] = []

    public getContacts(): Contact[] {
        if (this.contacts.length < 1) {
            const contactList = Array.from({ length: NUM_CONTACTS }, () => this.createContact())
            this.contacts = contactList.map((v: any, k: number) => this.addKeys(v, k))
        }
        return this.contacts
    }

    public add(contact: Contact): void {
        contact.id = this.contacts.length
        this.contacts.push(contact)
    }

    public compareNames(contact1: Contact, contact2: Contact) {
        return contact1.name > contact2.name
    }

    private random(max: number, min = 0): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    private generateFullName(): string {
        return `${firstNames[this.random(firstNames.length -1)]} ${lastNames[this.random(lastNames.length -1)]}`
    }
    
    private generatePhoneNumber(): string {
        return `(${this.random(99, 10)}) ${this.random(999, 100)}.${this.random(999, 100)}.${this.random(999, 100)}`
    }
    
    private createContact(): Contact {
        return {
            name: this.generateFullName(),
            phone: this.generatePhoneNumber()
        }
    }

    private addKeys(value: any, id: number) {
        return { id, ...value }
    }

}

export default new ContactBook()