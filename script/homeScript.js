let categoryContainer = document.getElementById("categories");
let productsContainer = document.getElementById("products");
let cart = document.getElementById("cart");
let showcart = document.querySelector(".show-cart");
let allOrders = cart.querySelector(".orders").children;
let allCategories = [];
let allProducts = [];

// Show Products In Page
const getUserData = async function() {
  try {
    const response = await fetch(`../api/userLoginData.php`);
    const data = await response.json();
    sessionStorage.setItem('userData', JSON.stringify(data));
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
  } catch (error) {
    console.error('Error Fetching User Data:', error);
    // window.location.href = 'error.html'; // redirect here .....
  }
};

let setUserInfo = function() {
  getUserData()
  .then(data => {
    document.querySelector(".user-name").innerText = data[0].user_name;
    document.querySelector(".user-image").src = data[0].img;
  })
} ();

// Show Products In Page
const getProducts = async function() {
  try {
    const response = await fetch(`../api/productsAPI.php`);
    allProducts = await response.json();
    allProducts.forEach(product => {
      if(product.available == "available"){
        setProduct(product);
      }
    });
  } catch (error) {
    console.error('Error Fetching Products:', error);
    // window.location.href = 'error.html'; // redirect here .....
  }
} ();

const getRooms = async function() {
  try {
    const response = await fetch(`../api/room_id.php`);
    const allRooms = await response.json();
    allRooms.forEach(room => setRoom(room));
  } catch (error) {
    console.error('Error Fetching Rooms:', error);
    // window.location.href = 'error.html'; // redirect here .....
  }
} ();

// Show Categories In Page
const getCategories = async function() {
  try {
    const response = await fetch(`../api/categoryAPI.php`);
    allCategories = await response.json();

    allCategories.push({ "id": 0, "img": "../images/landing-img.jpg", "name": "All Products"})
    // setCategory(allCategories.length - 1);
    allCategories.forEach(category => {
      setCategory(category);
    });
    for (let i = 0; i < allCategories.length - 1; i++) {
    }
  } catch(error) {
    console.error('Error Fetching Categories:', error);
    // window.location.href = 'error.html';
  }
} ();

// Create Category Element In Page
let setCategory = function(category) {
  let categoryItem = document.createElement("li");
  let icon = document.createElement("i");
  let p1 = document.createElement("p");
  let items = document.createElement("p");

  categoryItem.classList.add("category", "py-3", "mx-1", "mb-4", "px-4", "text-center", "list-unstyled");
  icon.classList.add("mb-2", "fa-solid", "fa-mug-hot");
  p1.classList.add("m-0", "fw-bold");
  items.classList.add("m-0");
  p1.innerText= category.name;

  let itemsCount = 0;
  allProducts.forEach(product => {
    if(product.available == "available" && category.id == 0) {
      itemsCount++;
    }
    else if(product.available == "available" && product.category_id == category.id) {
      itemsCount++;
    }
  })
  items.innerHTML = `<span>${itemsCount}</span> Items`;

  categoryItem.appendChild(icon);
  categoryItem.appendChild(p1);
  categoryItem.appendChild(items);
  categoryContainer.appendChild(categoryItem);
  
  categoryItem.addEventListener("click", ()=> showCategoryProducts(category));
};

// Create Product Element In Page
let setProduct = function(product) {
  let productItem = document.createElement("li");
  let image = document.createElement("img");
  let data = document.createElement("div");
  let name = document.createElement("p");
  let price = document.createElement("p");
  
  productItem.classList.add("product", "mb-3", "text-center", "list-unstyled");
  data.classList.add("data");
  name.classList.add("product-name", "m-0", "p-2");
  price.classList.add("price", "m-0", "p-2", "fw-bold");
  
  image.setAttribute("src", product.img);
  image.setAttribute("alt", product.name);
  
  name.innerText = product.name;
  price.innerText = product.price + " LE";
  
  productItem.appendChild(image);
  data.appendChild(name);
  data.appendChild(price);
  productItem.appendChild(data);
  productsContainer.appendChild(productItem);
  // Add Order When Clicking On Product
  productItem.addEventListener("click", () => setOrder(product));
};

// Create Order Element In Cart
let setOrder = function (product) {
  for(let i = 0; i < allOrders.length; i++) {
    let order = cart.querySelector(".orders").children[i];
    if(order.dataset.orderId == product.id) {
      addOrder(order);
      return;
    }
  }
  
  let newOrder = document.createElement("li");
  newOrder.classList.add("order", "center", "justify-content-between", "p-2", "m-1", "mb-2", "list-unstyled");
  newOrder.dataset.quantity = 0;
  newOrder.dataset.orderId = product.id;
  newOrder.dataset.orderPrice = product.price;
  
  let quantity = Number(newOrder.dataset.quantity);
  
  for(let i = 0; i < 4; i++) {
    newOrder.appendChild(document.createElement("div"));
  }

  let image = document.createElement("img");
  image.setAttribute("src", product.img);
  image.setAttribute("alt", product.name);
  newOrder.children[0].appendChild(image);
  
  newOrder.children[1].innerHTML =
    `<p class="m-0 fw-bold">${product.name}</p>
    <div class="counter d-flex">
      <span class="quantity">${quantity}</span>
      <button class="add fw-bold reset center mx-1">+</button>
      <button class="remove fw-bold reset center">-</button>
    </div>`;
  newOrder.children[3].innerHTML = `<button id="cancelOrder" class="cancel reset center text-danger"><i class="fa-regular fa-circle-xmark"></i></button>`;
  cart.querySelector(".orders").appendChild(newOrder);
  addOrder(newOrder);
};

// Add Rooms Cart
let setRoom = function(room) {
  // console.log(cart.querySelector(".rooms").innerHTML);
  cart.querySelector(".rooms").innerHTML += `<option class="reset" value="${room.id}">Room ${room.id}</option>`
  
}
// Make Actions On Orders In Cart (Add, Remove, Cancel)
cart.addEventListener("click", function(e) {
  let order = e.target.closest(".order");
  if(e.target.parentNode.classList.contains("cancel")) {
    order.remove();
    totalcart();
    ordersExistance();
  }
  if(e.target.classList.contains("add")) {
    addOrder(order);
  }
  if(e.target.classList.contains("remove")) {
    removeOrder(order);
  }
});

// Add Order In Cart
let addOrder = function(order) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = ++quantity;
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order);
  ordersExistance();
}

// Calculate Order Price
let orderPrice = function (order) {
  order.children[2].innerText = Number(order.dataset.quantity) * Number(order.dataset.orderPrice);
  totalcart();
}

// Calculate Total Cart Price
let totalcart = function() {
  let cartPrice = 0;
  for (let i = 0; i < allOrders.length; i++) {
    cartPrice += Number(allOrders[i].children[2].innerText);
  }
  cart.querySelector(".cart-price").children[0].innerText = cartPrice;
};

// Remove Order From Cart
let removeOrder = function(order) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = --quantity;
  if(quantity == 0) {
    order.remove();
    orderPrice(order);
    ordersExistance();
    return;
  }
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order);
}

// Show Cart If It Has Orders
showcart.addEventListener("click", function(e) {
  if(allOrders.length > 0) {
    cart.classList.toggle("d-none");
  }
});

// Check If Cart Has Orders Or Not To Make Actions
let ordersExistance = function () {
  let container = document.getElementsByTagName("main")[0]
  if(allOrders.length == 0) {
    cart.classList.add("d-lg-none");
    cart.classList.add("d-none");
    cart.classList.remove("d-lg-block");
    container.classList.add("col-lg-12");
    container.classList.remove("col-lg-9");
    showcart.classList.add("empty");
    showcart.children[0].innerText = allOrders.length;
  } else {
    cart.classList.add("d-lg-block");
    container.classList.add("col-lg-9");
    cart.classList.remove("d-lg-none");
    container.classList.remove("col-lg-12");
    showcart.classList.remove("empty");
    showcart.children[0].innerText = allOrders.length;
  }
}

// Show Products Based On Its Category
let showCategoryProducts = function(category) {
  let productsElement = document.getElementById("products");
  productsElement.innerHTML = "";
  productsElement.previousElementSibling.innerText = category.name;
  allProducts.forEach(product => {
    if(product.available == "available" && category.id == 0) {
      setProduct(product);
    } else if(product.available == "available" && product.category_id == category.id) {
      setProduct(product);
    }
  })
};

// Send Order
document.querySelector(".confirm").addEventListener("click", function() {
  let orderDetails = [];
  for(let i = 0; i < allOrders.length; i++) {
    let order = allOrders[i];
    let quantity = Number(order.querySelector(".quantity").innerText);
    orderDetails.push({product_id: order.dataset.orderId, quantity: quantity});
  }
  let orderObject = {customers_id: 1, room: 2,  products: orderDetails};
  sendOrder(orderObject);
});

let sendOrder = async function (orderObject) {
  try {
    const response = await fetch('../api/insertOrder.php', {
      method: 'POST',
      body: JSON.stringify(orderObject)
    });
    const responseData = await response.json();
    if(responseData.status == "success") {
      orderSentSuccessfully();
      window.location.reload();
    }
  } catch (error) {
    console.error('Error Sending Order:', error);
    window.location.href = 'error.html';
  }
};

let orderSentSuccessfully = function() {

}