
class AuthService {

    public async authenticate(username: string, password: string): Promise<boolean> {
        try {
            // I'm using this API example in replace to localhost:8000 used in class.
            const response = await fetch('http://example-ecommerce.herokuapp.com/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ login: username, password })
            })
            
            if (response.status === 200) return true
            console.log(await response.text())

        } catch(error) {
            console.warn(error)
        }
        return false
    }

}

export default new AuthService()