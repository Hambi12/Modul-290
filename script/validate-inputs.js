// read form element
let ALL_INPUT_VALID;

//reading fields from input form
const form = document.getElementById('form');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const phone = document.getElementById('phone');
const adress = document.getElementById('adress');
const subject = document.getElementById('subject');


// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
    ALL_INPUT_VALID = false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
      ALL_INPUT_VALID = false;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
        `${getFieldName(input)} must be at least ${min} characters`
    );
    ALL_INPUT_VALID = false;
  } else if (input.value.length > max) {
    showError(input,
        `${getFieldName(input)} must be less than ${max} characters`
    );
    ALL_INPUT_VALID = false;
  } else {
    showSuccess(input);
  }
}

function checkAge(input){
  if (input.value >= 8){
    showSuccess(input);
  }
  else {
    showError(input,'You have to be 8 years old.');
    ALL_INPUT_VALID = false;
  }
}


//Check Phone
function checkphone(input) {
  const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'You have tipped in a wrog phone number');
    ALL_INPUT_VALID = false;
  }
}


/**
 * Get fieldname
 * @param input: HTML-Element by its id
 * @returns {string}: Returns caption of the input field with first Letter in capital
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function validateForm(){
  if(!checkRequired([email, firstName, lastName, age, phone, subject, adress])){
    checkLength(firstName, 3, 20);
    checkLength(lastName, 3, 20);
    checkLength(subject, 3, 250);
    checkLength(lastName, 3, 100);
    checkEmail(email);
    checkphone(phone);
    checkAge(age);


  }
}


/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
  console.log(`Make test call to the server ...`);
  getWelcome().then(
      result => {
        console.log(`Response from server: ${result}`);
      },
      error => {
        console.log(error)
      }
  );
};

/**
 * Event listener
 */
form.addEventListener('submit', function(e) {
  ALL_INPUT_VALID = true;
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  if (ALL_INPUT_VALID){
    //Pay attention: use value property to send data. If omitting
    //you're sending HTML-DOM objects!

    /* Aufgabe: Senden Sie folgende zusätzlich Input-Daten zum Server:
        lastName, subject, description, phone
    */
    //--Begin
    let formData = {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        phone: phone.value,
        adress: adress.value,
        subject: subject.value
      }


    console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);


    //Variant 2
    sendForm2(formData).then(
        result => {
          console.log(`Response from server: ${result}`);
          window.location.href = './confirm.html';
        },
        error => {
          console.log(error);
        }
    );


  } else {
    console.log("At least one validation failed. No data sent to contact-server.")
  }

});
