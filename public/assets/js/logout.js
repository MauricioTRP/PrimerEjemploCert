const logoutBtn = document.querySelector("#logout")

logoutBtn.addEventListener("click", async (event) => {
  event.preventDefault()

  try {
    const response = await fetch("./auth/logout", {
      method: "DELETE"
    })

    const data = await response.json()

    window.location = '/login'
  } catch (err) {
    console.error(err)
  }


})