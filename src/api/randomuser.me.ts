import { Contact } from "../domain/contact";

class RandomUserMe {

    private convert = (user: any, index: number): Contact => ({
        id: index,
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        address: {
            longitude: Number(user.location.coordinates.longitude),
            latitude: Number(user.location.coordinates.latitude),
        }
    })

    public async getContacts(amount: number = 50): Promise<Contact[]> {
        const response = await fetch('https://randomuser.me/api/?results='+amount)
        const {results} = await response.json()
        return results.map(this.convert)
    }

}

export default new RandomUserMe()