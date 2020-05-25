import { Contact } from './contact'

const NUM_CONTACTS = 10000
const firstNames = [ 'Eddard', 'Tywin', 'John', 'Hector', 'Adam', 'Uedson', 'Winston', 'Mary', 'Lyanna' ]
const lastNames = [ 'Smith', 'Lannister', 'Williams', 'Bull', 'Stark', 'Reis', 'Arryn', 'Reyne', 'Windsor' ]

class ContactBook {

    public getContacts() {
        const contactList = Array.from({ length: NUM_CONTACTS }, () => this.createContact())
        return contactList.map((v: any, k: number) => this.addKeys(v, k))
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
        return `${this.random(999, 100)} - ${this.random(999, 100)} - ${this.random(9999, 1000)}`
    }
    
    private createContact(): Contact {
        return {
            name: this.generateFullName(),
            phone: this.generatePhoneNumber()
        }
    }

    private addKeys(value: any, key: any) {
        return { key, ...value }
    }

}

export default new ContactBook()