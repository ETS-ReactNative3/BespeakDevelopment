var regularName = /^[a-zA-Z ]*$/;

export function validateName(value) {
    if (!value.match(regularName) || value.length < 2){
        return false;
    }
    return true;
}