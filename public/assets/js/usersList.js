const usersList = document.getElementById("usersList")

document.addEventListener("DOMContentLoaded", async (event) => {

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch("/users", requestOptions)
    const data = await response.json()
  
    console.log(data)
  } catch (err) {
    console.error(err)
  }
})