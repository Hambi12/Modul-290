/**
 * Server-URL
 */
const SERVER = 'http://localhost:3000';

/**
 * Variant 2: Send form data to contact-server
 * Pro: Response from contact-server can be processed (major drawback)
 * Cons: Implementation is little more complex
 */
function sendForm2(data) {
    //DO NOT FORGET the return!
    return fetch(SERVER+'/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.text())
        .catch(err => {
            console.log(`Error occurred: ${err}`)
        })
}
