const getUsers = async function(){
    try {
        const response = await fetch('../api/userAPI.php');
        const json = await response.json();
        usercard(json);
        updateClickBtn();
        deleteClickBtn();
    } catch(error) {
        console.log(error);
    }
}();

const usercard = function(json){
    json.forEach(user => {
        let sectionTag = document.querySelector('#cardsContainer');
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'user');
        cardDiv.innerHTML = `
            <div class="user-img">
                <img src="../images/${user.img}" class="card-img-top">
            </div>
            <div class="card-body">
                <h6 class="card-title m-0">${user.fname} ${user.lname}</h6>
                <p class="m-0"><span class="badge text-success">Room:${user.room}</span> - <span
                    class="badge text-success">EXT.:${user.extNumber}</span>
                </p>
                <div class="d-flex gap-2 justify-content-center">
                    <a href="#" title="cancel" class="btn btn-primary edit-btn" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#updateModal"><i
                        class="fa-solid fa-pen"></i>  </a>
                    <a href="#" title="cancel" class="btn btn-danger delete-btn" data-id="${user.id}"><i class="fa-solid fa-xmark" data-bs-toggle="modal" data-bs-target="#deleteModal"></i></a>
                </div>
            </div>
        `;
        sectionTag.appendChild(cardDiv);
    });
}

let updateClickBtn = function(){
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const userId = event.currentTarget.getAttribute('data-id');
            const dataUpdate = async function(){
                try {
                    const response = await fetch(`../api/selectSpecificUser.php?id=${userId}`);
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
        document.getElementById('updatefname').value = key.fname
        document.getElementById('updatelname').value = key.lname
        document.getElementById('updateuseremail').value = key.email
        document.getElementById('updateroom').value = parseInt(key.room) 
        document.getElementById('updatepass').value =parseInt( key.password)
        // document.getElementById('userimg').value = userData.img
    })
}
    const deleteClickBtn = function(){
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            const userId = event.currentTarget.getAttribute('data-id');
            console.log(userId);
        });
      });
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
