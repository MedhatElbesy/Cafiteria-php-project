// import * as data from './LoggedUser.js';

const startpage = async function () {
  try {
    const response = await fetch("../api/productsAPI.php");
    const json = await response.json();
    productCard(json);
    updateClickBtn();
    deleteClickBtn();
  } catch (error) {
    console.log(error);
  }
};

startpage();

let sectionTag = document.querySelector("#cardsProducations");
const productCard = function (json) {
  json.forEach((production) => {
    let classn = "btn-primary";
    let classb = "fa-check";
    if (production.available == "non available") {
      (classn = "btn-danger"), (classb = "fa-ban");
    }

    sectionTag.innerHTML += `
        <div class="myorder_card card bg-white bg-opacity-50 mt-3 me-2 py-3 shadow-sm">
        <a href="#" title="edit" class="edit_order btn btn-warning edit-btn" category="${production.category_id}" data-id="${production.id}" data-bs-toggle="modal"
          data-bs-target="#updateModal"><i class="fa-solid fa-pen-to-square"></i></a>
        <a href="#" title="availability" class="available_order btn ${classn}" onclick="changeStatus(${production.id},'${production.available}')" data-id="${production.id}" ><i class="fa-solid ${classb}"></i></a>
        <div class="status badge bg-secondary">${production.price} EGP</div>
        <img src="${production.img}" class="card-img-top w-75 h-75 me-5" alt="...">
        <div class="card-body w-100 p-0">
          <div class="badge text-dark mb-2 w-100">${production.name}</div>
        </div>
      </div>
        `;
  });
};

let updateClickBtn = function () {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      changeSelect(event.currentTarget.getAttribute("category"));
      event.preventDefault();
      const userId = event.currentTarget.getAttribute("data-id");
      const dataUpdate = (async function () {
        try {
          const response = await fetch(
            `../api/selectSpecificProduct.php?id=${userId}`
          );
          const userData = await response.json();
          dataForUpdate(userData);
        } catch (error) {
          console.log("error");
        }
      })();
    });
  });
};

function dataForUpdate(userData) {
  userData.forEach((key) => {
    document.getElementById("productName").value = key.name;
    document.getElementById("productPrice").value = parseInt(key.price);
    document.getElementById("productid").value = parseInt(key.id);
  });
}
const deleteClickBtn = function () {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const userId = event.currentTarget.getAttribute("data-id");
      document.getElementById("deleteButtn").value = userId;
    });
  });
};

async function changeStatus(id, Status) {
  if (Status == "available") {
    Status = "non available";
  } else {
    Status = "available";
  }
  const response = await fetch(
    `../api/selectSpecificProduct.php?id=${id}&status=${Status}`
  );
  element = document.querySelectorAll(`a[data-id="${id}"]`)[1];
  element.firstChild.classList.toggle("fa-ban");
  element.firstChild.classList.toggle("fa-check");
  element.classList.toggle("btn-primary");
  element.classList.toggle("btn-danger");
}

function changeSelect(id_category) {
  Array.from(
    document.querySelectorAll(".categorySelector")[1].children
  ).forEach((option) => {
    option.removeAttribute("selected");
  });
  let i = 0;
  while (true) {
    if (
      document.querySelectorAll(".categorySelector")[1].children[i].value ==
      id_category
    ) {
      document
        .querySelectorAll(".categorySelector")[1]
        .children[i].setAttribute("selected", "selected");
      break;
    }
    ++i;
  }
}

let selectors = document.querySelectorAll(".categorySelector");

const getCategories = async function () {
  try {
    const response = await fetch(`../api/categoryAPI.php`);
    const category = await response.json();

    selectors.forEach((selector) => {
      for (let i = 0; category.length > i; ++i) {
        selector.innerHTML += `
                <option value="${category[i].id}">${category[i].name}</option>`;
      }
    });
  } catch (error) {
    console.log("error");
  }
};

getCategories();

async function insertcategory() {
  let formAddCategory = document.getElementById("addCategoryForm");
  if (formAddCategory.checkValidity()) {
    const fileInput = document.getElementById("addcategory");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("name", document.getElementById("category").value);
    formData.append("img", file);

    fetch("../api/insertcategory.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      });

    setTimeout(() => {
      selectors[0].innerHTML = "";
      selectors[1].innerHTML = "";
      getCategories();
    }, 100);
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("categoryModal")
    ).hide();
  }
}

async function senddata() {
  let formAddProduct = document.getElementById("formInsert");
  if (formAddProduct.checkValidity()) {
    const fileInput = document.getElementById("product_imgAdd");
    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append("name", document.getElementById("productNameAdd").value);
    formData.append(
      "category_id",
      parseInt(document.getElementById("selectorCategoryAdd").value)
    );
    formData.append(
      "price",
      parseInt(document.getElementById("productPriceAdd").value)
    );
    formData.append("available", "available");
    formData.append("img", file);

    fetch("../api/insertProduct.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      });

    setTimeout(() => {
      sectionTag.innerHTML = "";
      startpage();
    }, 100);
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("addModal")
    ).hide();
  }
}

async function updateProduct() {
  let formUpdateProduct = document.getElementById("updateform");

  if (formUpdateProduct.checkValidity()) {
    const fileInput = document.getElementById("product_img");
    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append("id", parseInt(document.getElementById("productid").value));
    formData.append("name", document.getElementById("productName").value);
    formData.append(
      "category_id",
      parseInt(document.getElementById("productCategory").value)
    );
    formData.append(
      "price",
      parseInt(document.getElementById("productPrice").value)
    );
    formData.append("available", "available");
    formData.append("img", file);

    fetch("../api/updateProduct.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      });
    setTimeout(() => {
      sectionTag.innerHTML = "";
      startpage();
    }, 100);
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("updateModal")
    ).hide();
  }
}
