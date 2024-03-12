const getUsers = async function(){
    try {
        const response = await fetch('../api/productsAPI.php');
        const json = await response.json();
        usercard(json);
        updateClickBtn();
        deleteClickBtn();
    } catch(error) {
        console.log(error);
    }
}();

const usercard = function(json){
    json.forEach(production => {
        let sectionTag = document.querySelector('#cardsProducations');
        // let cardDiv = document.createElement('div');
        // cardDiv.classList.add('');
        let classn="btn-primary";
        let classb="fa-check";
        if(production.available == "non available"){
            classn= "btn-danger",
            classb= "fa-ban"
        }


        sectionTag.innerHTML += `
        <div class="myorder_card card mt-3 me-2 py-3 shadow-sm">
        <a href="#" title="cancel" class="cancel_order btn btn-danger"><i class="fa-solid fa-xmark"></i></a>
        <a href="#" title="edit" class="edit_order btn btn-warning edit-btn" data-id="${production.id}" data-bs-toggle="modal"
          data-bs-target="#updateModal"><i class="fa-solid fa-pen-to-square"></i></a>
        <a href="#" title="availability" class="available_order btn ${classn}" onclick="changeStatus(${production.id},'${production.available}')" data-id="${production.id}" ><i class="fa-solid ${classb}"></i></a>
        <div class="status badge bg-secondary">${production.price} EGP</div>
        <img src="../images/coffee-cup.gif" class="card-img-top w-75 h-75 me-5" alt="...">
        <div class="card-body w-100 p-0">
          <div class="badge text-dark mb-2 w-100">${production.name}</div>
        </div>
      </div>
        `;


        var myvarrr = `
            <div class="user-img">
                <img src="../images/${production.img}" class="card-img-top">
            </div>
            <div class="card-body">
                <h6 class="card-title m-0">${production.fname} ${production.lname}</h6>
                <p class="m-0"><span class="badge text-success">Room:${production.room}</span> - <span
                    class="badge text-success">EXT.:${production.extNumber}</span>
                </p>
                <div class="d-flex gap-2 justify-content-center">
                    <a href="#" title="cancel" class="btn btn-primary edit-btn" data-id="${production.id}" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" title="cancel" class="btn btn-danger delete-btn" data-id="${production.id}"data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-solid fa-xmark"></i></a>
                </div>
            </div>
        `;
        // sectionTag.appendChild(cardDiv);


    });
}

let updateClickBtn = function(){
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const userId = event.currentTarget.getAttribute('data-id');
            const dataUpdate = async function(){
                try {
                    const response = await fetch(`../api/selectSpecificProduct.php?id=${userId}`);
                    const userData = await response.json();
                    dataForUpdate(userData);
                } catch(error) {
                    console.log("error");
                }
            }();
        });
    });
}

function dataForUpdate(userData){
    userData.forEach(key => {
        
        document.getElementById('productName').value = key.name
        document.getElementById('productPrice').value = key.price
        // document.getElementById('updatelname').value = key.lname
        // document.getElementById('updateuseremail').value = key.email
        // document.getElementById('updateroom').value = parseInt(key.room) 
        // document.getElementById('updatepass').value =parseInt( key.password)
       
        // document.getElementById('userimg').value = userData.img
    })
}
    const deleteClickBtn = function(){
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            const userId = event.currentTarget.getAttribute('data-id');
            document.getElementById('deleteButtn').value =userId
        });
      });
    }

    async function changeStatus(id,Status){
        if(Status=="available"){Status="non available"}else{Status="available"}
        const response = await fetch(`../api/selectSpecificProduct.php?id=${id}&status=${Status}`);
        element = document.querySelectorAll(`a[data-id="${id}"]`)[1];
        element.firstChild.classList.toggle("fa-ban");
        element.firstChild.classList.toggle("fa-check");
        element.classList.toggle("btn-primary");
        element.classList.toggle("btn-danger");


        


    }

    // document.getElementById('editForm').addEventListener('submit',
//   async function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);
//     try{
//       const responce = await fetch('../api/editCustomer.php',{
//       method:'POST',
//       body: formData
//     });
//     const responseResault = await responce.json();
//     console.log(responseResault)
//     }catch(error){
//       console.log("error");
//     }
//   });
