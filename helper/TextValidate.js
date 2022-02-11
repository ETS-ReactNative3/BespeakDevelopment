var regularName = /^[a-zA-Z ]*$/;
var regularOrgName = /^[a-zA-Z0-9.#+_!' ]*$/;
var regularEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var regularMobile = /^[0-9-+)(]*$/;
var regularPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*@._-]{8,16}$/;
;

export function validateName(value) {
    if (!value.match(regularName) || value.length < 2){
        return false;
    }
    return true;
}

export function validateOrgName(value) {
    if (!value.match(regularOrgName) || value.length < 2){
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

export function validateText(value) {
    return validateOrgName(value)
}