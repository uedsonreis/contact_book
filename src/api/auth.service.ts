
class AuthService {

    public async authenticate(username: string, password: string): Promise<string | null> {
        try {
            // I'm using this API example in replace to localhost:8000 used in class.
            const response = await fetch('https://example-ecommerce.herokuapp.com/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ login: username, password })
            })

            if (response.ok) return await response.text()

        } catch(error) {
            console.warn(error)
        }
        return null
    }

}

export default new AuthService()