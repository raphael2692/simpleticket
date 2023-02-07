import axios from "axios";
import jwt_decode from "jwt-decode";
import { decode } from "punycode";

const API_URL = "http://localhost:8000"


// expires_at
// logged_user

export interface TokenPayload {
    token_type: string
    exp: string
    jti: string
    iat: string
    user_id: string
  }

function decorateHeader(accessToken:string) {
    return axios
            .create ({
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            })
    
}
class AuthService {
    login(username:string, password:string) {
        return axios
        .post(API_URL + "/api/token/", {username, password})
         .then(
             (res) => {
                console.log("token res:")
                console.log(res)
                localStorage.setItem("access_token", res.data.access)
                const tokenPayload = localStorage.getItem("access_token")
                // loggedUser?console.log(jwt_decode(loggedUser)): console.log("Error getting token!")
                if (tokenPayload) {
                    const decodedTokenPayload:TokenPayload = jwt_decode(tokenPayload)
                    localStorage.setItem("expires_at", decodedTokenPayload.exp)
                    this.getLoggedUser(decodedTokenPayload, res.data.access)
                }
            }
         )
    }

   private getLoggedUser(decodedTokenPayload:TokenPayload, access_token:String) {
        const userId = decodedTokenPayload.user_id

        return axios
        .get(API_URL + "/users/" + userId + "/", {
            headers: {
                'content-type' : `application/json`,
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(
            (res) => {
                console.log("login res:")
                console.log(res)
                localStorage.setItem("logged_user", res.data) // salvarlo in store non in local storage
            }
        )
    }
}

export default new AuthService();