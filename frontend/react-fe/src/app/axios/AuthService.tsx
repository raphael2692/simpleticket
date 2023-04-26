import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8000"

export interface TokenPayload {
    token_type: string
    exp: string
    jti: string
    iat: string
    user_id: string
}

export interface SessionData {
    token: Object
    user: Object
}

class AuthService {
    // TODO creare due metodi separati, login e setSession
    async login(username: string, password: string) {

        let sessionData: SessionData = { token: {}, user: {} }

        await axios
            .post(API_URL + "/api/token/", { username, password })
            .then(
                (res) => {

                    localStorage.setItem("access_token", res.data.access)

                    const tokenPayload = localStorage.getItem("access_token")

                    if (tokenPayload) {

                        const decodedTokenPayload: TokenPayload = jwt_decode(tokenPayload)

                        localStorage.setItem("expires_at", decodedTokenPayload.exp)

                        sessionData.token = decodedTokenPayload

                        this.getLoggedUser(decodedTokenPayload, res.data.access)
                            .then(
                                (res) => {
                                    if (res) {
                                        sessionData.user = res
                                        // console.log("Login completed")
                                    }
                                }
                            )
                    }
                }
            )
            .finally(
                // () => console.log(sessionData)
            )

        return sessionData
    }

    private async getLoggedUser(decodedTokenPayload: TokenPayload, access_token: String) {

        const userId = decodedTokenPayload.user_id

        let userData

        await axios
            .get(API_URL + "/users/" + userId + "/", {
                headers: {
                    'content-type': `application/json`,
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(
                (res) => {
                    localStorage.setItem("logged_user", res.data)
                    userData = res.data
                }
            )

        return userData
    }
}

export default AuthService;