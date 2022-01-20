var regularName = /^[a-zA-Z ]*$/;
var regularEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var regularMobile = /^[0-9-+]*$/;
var regularPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function validateName(value) {
    if (!value.match(regularName) || value.length < 2){
        return false;
    }
    return true;
}

export function validateEmail(value) {
    if(!value.match(regularEmail) || value.length < 3) {
        return false;
    }
    return true;
}

export function validateMobile(value) {
    if(!value.match(regularMobile) || value.length < 11) {
        return false;
    }
    return true;
}

export function validatePassword(value) {
    if(!value.match(regularPassword)) {
        return false;
    }
    return true;
}