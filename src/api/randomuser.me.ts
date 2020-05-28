import { Contact } from "../domain/contact";

class RandomUserMe {

    private convert = (user: any, index: number): Contact => ({
        id: index,
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone
    })

    public async getContacts(amount: number = 100): Promise<Contact[]> {
        const response = await fetch('https://randomuser.me/api/?results='+amount)
        const {results} = await response.json()
        return results.map(this.convert)
    }

}

export default new RandomUserMe()