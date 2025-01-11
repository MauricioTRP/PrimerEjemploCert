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
    document.getElementById("usersList").innerHTML = generateUsersTable(data)
    addEventsListeners()
  } catch (err) {
    console.error(err)
  }
})

const generateUsersTable = (data) => {
  return data.filter(user => user.role == 'skater').map(user => `
    <div class="col-sm-12 col-md-6 col-lg-6 card">
        <div class="container d-flex justify-content-evenly">
            <div class="align-content-center" style="width: 35% ">
              <h4 class="text-warning card-title text-center">${user.firstName + ' ' + user.lastName}</h4>
              <div class="text-center mb-1">
                <button type="button" class="btn btn-secondary btn-sm" id="${user.id}" data-user="${user.id}">Modificar</button>
              </div>
            </div>
            <div class="p-1 align-content-center" style="width: 65%">
                <div class="d-flex justify-content-around">
                    <h6><span class="badge text-bg-${user.isActive ? 'success' : 'danger'}">Estado: ${user.isActive ? 'Activo' : 'Inactivo'} KG.</span></h6>
                </div>
                <h6 class="text-center small"><span class="badge text-bg-primary">${user.email}</span></h6>
            </div>
        </div>
    </div>
`).join(' ');
}

const addEventsListeners = () => {
  const buttons = document.querySelectorAll("[data-user]") // Seleccionamos botones

  console.log(buttons)
  for(let button of buttons) {
    button.addEventListener("click", async (event) => {
      const id = event.target.getAttribute('data-user');

      console.log(id)
      try {
        const response = await fetch(`./users/status/${id}`, {
          method: 'PUT'
        })
  
        const data = await response.json()
  
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    })
  }
}