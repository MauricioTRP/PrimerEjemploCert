console.log('Formulario de Login')

const form = document.querySelector('#login')

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  let { email, password } = event.target
  
  email = email.value
  password = password.value

  try {
    const response = await fetch('./auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    alert(JSON.stringify(data))

    window.location = '/admin'
  } catch (err) {
    console.error(err)
  }

  console.log('Enviando formulario')
})