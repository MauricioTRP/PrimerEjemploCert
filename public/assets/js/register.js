console.log('Formulario de Registro')

const form = document.querySelector('#register')

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  let { firstName, lastName, email, password } = event.target
  
  firstName = firstName.value
  lastName = lastName.value
  email = email.value
  password = password.value

  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }

  console.log('Enviando formulario')
})