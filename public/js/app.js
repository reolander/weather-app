console.log('This is client side JS')

// -------------------------------------------------
// fetch('https://puzzle.mead.io/puzzle')
//   .then((response) => {
//     response.json()
//       .then((data) => {
//         console.log(data);
//       })
//   })
// -------------------------------------------------

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const search = document.querySelector('form input')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const location = search.value
 // fetch('http://localhost:3000/weather?address='+ location)
 fetch('/weather?address='+ location).then((response) => {
    response.json()
      .then((data) => {
        if(data.error) {
          messageOne.textContent = data.error
        } else {
          console.log(data)
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
  }) 
})


