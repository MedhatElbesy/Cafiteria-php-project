import * as data from './LoggedUser.js';
import * as utility from './utilities.js';

let categoryContainer = document.getElementById("categories");
let productsContainer = document.getElementById("products");
let cart = document.getElementById("cart");
let showcart = document.querySelector(".show-cart");
let allOrders = cart.querySelector(".orders").children;
let currentRoom = data.userData["room"];
let currentUser = null;
let allCategories = null;
let allProducts = null;

// Show Products In Page
const getProducts = async function() {
  try {
    utility.loading();
    const response = await fetch(`../api/productsAPI.php`);
    allProducts = await response.json();
    await Promise.all(allProducts.map(product => {
      if(product.available == "available") {
        setProduct(product);
      }
    }));
    await getCategories();
  } catch (error) {
    console.error('Error Fetching Products:', error);
    // window.location.href = 'error.html'; // redirect here .....
  }
} ();

// Show Categories In Page
const getCategories = async function() {
  try {
    const response = await fetch(`../api/categoryAPI.php`);
    allCategories = await response.json();

    // Addin All Products Category
    allCategories.push({ "id": 0, "img": "../images/categories/food.png", "name": "All Products"})
    setCategory(allCategories[allCategories.length - 1])
    await Promise.all(allCategories.slice(0, -1).map(category => setCategory(category)));
    getRooms();
  } catch(error) {
    console.error('Error Fetching Categories:', error);
    // window.location.href = 'error.html';
  }
};

// Show Rooms In Cart
const getRooms = async function() {
  try {
    const response = await fetch(`../api/room_id.php`);
    const allRooms = await response.json();
    await Promise.all(allRooms.map(room => setRoom(room)));
    if(data.userData["position"] == "admin"){
      getCustomers();
    }
    utility.loading();
  } catch (error) {
    console.error('Error Fetching Rooms:', error);
    // window.location.href = 'error.html'; // redirect here .....
  }
};

// Show Users In Cart For Admin
if(data.userData["position"] == "admin") {
  var getCustomers = async function() {
    try {
      const response = await fetch(`../api/usersdata.php`);
      const allCustomers = await response.json();
      await Promise.all(allCustomers.map(customer => {
        cart.querySelector(".customers").innerHTML += `<option class="reset" data-room="${customer.room}" value="${customer.id}">${customer.name}</option>`;
      }));
    } catch (error) {
      console.error('Error Fetching Users:', error);
      // window.location.href = 'error.html'; // redirect here .....
    }
  };

  // Assign Room To Selected Customer
  cart.querySelector(".customers").addEventListener('change', function(e) {
    document.querySelector(".customers-name").classList.remove("not-selected");
    const customerRoom = e.target.options[e.target.selectedIndex].dataset.room;
    const rooms = cart.querySelector(".rooms").options;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].value == customerRoom) {
        rooms[i].selected = true;
      }
    }
  });
} else {
  currentUser = data.userData["id"];
}

// Create Category Element In Page
let setCategory = function(category) {
  let categoryItem = document.createElement("li");
  let image = document.createElement("img");
  let p1 = document.createElement("p");
  let items = document.createElement("p");

  categoryItem.classList.add("category", "p-2", "mx-1", "mb-4", "text-center", "list-unstyled");
  
  image.setAttribute("src", category.img);
  image.setAttribute("alt", category.name);

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

  categoryItem.appendChild(image);
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

// Add Rooms In Cart
let setRoom = function(room) {
  if(room.id == currentRoom) {
    cart.querySelector(".rooms").innerHTML += `<option class="reset" value="${room.id}" selected>Room ${room.id}</option>`
  } else {
    cart.querySelector(".rooms").innerHTML += `<option class="reset" value="${room.id}">Room ${room.id}</option>`
  }
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
}

// Send Order
document.querySelector(".confirm").addEventListener("click", function(e) {
  // Select Customer For Admin
  if((data.userData["position"] == "admin")) {
    const selectCustomer = cart.querySelector(".customers");
    const selectedOption = selectCustomer.options[selectCustomer.selectedIndex];
    if(!selectedOption.value) {
      document.querySelector(".customers-name").classList.add("not-selected");
      return;
    } else {
      currentUser = selectedOption.value;
    }
  }

  // Select Customer Room
  const selectRoom = cart.querySelector(".rooms");
  const selectedOption = selectRoom.options[selectRoom.selectedIndex];
  currentRoom = selectedOption.value;

  // Making Order Object
  let orderDetails = [];
  for(let i = 0; i < allOrders.length; i++) {
    let order = allOrders[i];
    let quantity = Number(order.querySelector(".quantity").innerText);
    orderDetails.push({product_id: order.dataset.orderId, quantity: quantity});
  }
  let orderObject = {customers_id: currentUser, room: currentRoom, products: orderDetails};
  sendOrder(orderObject);
});

let sendOrder = async function (orderObject) {
  try {
    utility.loading();
    const response = await fetch('../api/insertOrder.php', {
      method: 'POST',
      body: JSON.stringify(orderObject)
    });
    const responseData = await response.json();
    utility.loading();
    if(responseData.message != 0) {
      utility.orderSent();
    }
  } catch (error) {
    console.error('Error Sending Order:', error);
    // window.location.href = 'error.html';
  }
};