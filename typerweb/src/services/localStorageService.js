class LocalStorageService{
    
    get token() {
        return localStorage.getItem("token");
    }
    set token(token) {
        localStorage.setItem("token", token);
    }    

    get role() {
        return localStorage.getItem("role");
    }
    set role(role) {
        localStorage.setItem("role", role);
    }    

    get username() {
        return localStorage.getItem("username");
    }
    set username(username) {
        localStorage.setItem("username", username);
    }
}

const localStorageService = new LocalStorageService();

export {localStorageService}