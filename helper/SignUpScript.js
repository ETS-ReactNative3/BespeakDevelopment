export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );
 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

 //code from rtuappsys
 
 // Input Fields
 const first_name = document.getElementById('first-name');
 const last_name = document.getElementById('last-name');
 const contact_number = document.getElementById('contact-number');
 const email_address = document.getElementById('email-address');
 
 // Error Labels
 const error_first_name = document.getElementById('error-first-name');
 const error_last_name = document.getElementById('error-last-name');
 const error_contact_number = document.getElementById('error-contact-number');
 const error_email_address = document.getElementById('error-email-address');
 
 var wordRegex = /^[a-zA-Z ]*$/;
 var word2Regex = /^[A-Za-z0-9\-\_]*$/;
 var word3Regex = /^[A-Za-z0-9\-.' \_]*$/;
 var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 var numberRegex = /^[0-9-+]*$/;
 
 function isFormValidated() {
     return isFirstNameValid() && isLastNameValid() && isContactValid() && isEmailValid();
 }
 
 function isFirstNameValid() {
     if(first_name.value == null || first_name.value == ''){
         error_first_name.textContent = "Please fill up this field";
     } else if (!first_name.value.match(wordRegex) || first_name.value.length < 2){
         error_first_name.textContent = "Invalid First Name";
     } else{
         error_first_name.textContent ="";
         return true;
     }
     return false;
 }
 
 function isLastNameValid() {
     if(last_name.value == null || last_name.value == ''){
         error_last_name.textContent = "Please fill up this field";
     } else if (!last_name.value.match(wordRegex) || last_name.value.length < 2){
         error_last_name.textContent = "Invalid Last Name";
     } else{
         error_last_name.textContent="";
         return true;
     }
     return false;
 }
 
 function isContactValid() {
     if(contact_number.value == null || contact_number.value == ''){
         error_contact_number.textContent = "Please fill up this field";
     } else if (!contact_number.value.match(numberRegex) || contact_number.value.length > 15 || contact_number.value.length < 6){
         error_contact_number.textContent = "Invalid Contact Number";
     } else{
         error_contact_number.textContent="";
         return true;
     }
     return false;
 }
 
 
 function isEmailValid() {
     if(email_address.value == null || email_address.value == ''){
         error_email_address.textContent = "Please fill up this field";
     } else if (!email_address.value.match(emailRegex) || email_address.value.length < 2){
         error_email_address.textContent = "Invalid Email Address";
     } else {
         if(error_email_address) {
             error_email_address.textContent="";
         }
         return true;
     }
     return false;
 }
  
 first_name.addEventListener("keyup", function(event){
     isFirstNameValid();
 });
 
 last_name.addEventListener("keyup", function(event){
     isLastNameValid();
 });
 
 contact_number.addEventListener("keyup", function(event){
     isContactValid();
 });
  
 email_address.addEventListener("keyup", function(event){
     isEmailValid();
 });
 