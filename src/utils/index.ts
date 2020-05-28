import { Contact } from "../domain/contact"

const NUM_CONTACTS = 100
const firstNames = ['Eddard', 'Tywin', 'John', 'Hector', 'Adam', 'Uedson', 'Winston', 'Mary', 'Lyanna', 'Edward', 'Daemon', 'Aegon', 'Lionel']
const lastNames = ['Smith', 'Lannister', 'Williams', 'Bull', 'Stark', 'Reis', 'Arryn', 'Reyne', 'Churchill', 'Windsor', 'Blackfyre', 'Targaryen', 'Messi']

export function getContactList(): Contact[] {
    const contactList = Array.from({ length: NUM_CONTACTS }, () => createContact())
    return contactList.map((v: any, k: number) => addKeys(v, k))
}

export function compareNames(contact1: Contact, contact2: Contact) {
    return contact1.name > contact2.name
}

function random(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateFullName(): string {
    return `${firstNames[random(firstNames.length - 1)]} ${lastNames[random(lastNames.length - 1)]}`
}

function generatePhoneNumber(): string {
    return `(${random(99, 10)}) ${random(999, 100)}.${random(999, 100)}.${random(999, 100)}`
}

function createContact(): Contact {
    return {
        name: generateFullName(),
        phone: generatePhoneNumber()
    }
}

function addKeys(value: any, id: number) {
    return { id, ...value }
}