console.log('Formulario de Registro')

const form = document.querySelector('#register')

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const form = event.target
  let { firstName, lastName, email, password, picture } = event.target
  const formData = new FormData()

  formData.append("firstName", firstName.value)
  formData.append("lastName", lastName.value)
  formData.append("email", email.value)
  formData.append("password", password.value)
  formData.append("picture", picture.files[0])

  try {
    const fileResponse = await fetch('/users', {
      method: 'POST',
      body: formData
    })

    const dataFile = await fileResponse.json()
    console.log(dataFile)
  } catch (err) {
    console.error(err)
  }

  console.log('Enviando formulario')
})