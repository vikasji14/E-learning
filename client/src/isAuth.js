
import {jwtDecode} from 'jwt-decode'; // This should be the correct import


export function isAuth() {
    const token = localStorage.getItem('token');
    if (!token) {

        return false;
    }
    const decoded = jwtDecode(token);  // Decode the token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        return false;  // Token is expired
    }
    return true;  // Token is valid
};
