const scriptURL = 'https://script.google.com/macros/s/AKfycbwSBimqZEAaALY97LK-QDeQ6ifDUzPoRkJYMdOYRhTSK4hnHZ187Bqh1uXxByatsKZg/exec'
const form = document.forms['submit-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})