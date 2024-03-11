let categoryContainer = document.getElementById("categories");
let productsContainer = document.getElementById("products");
let cart = document.getElementById("cart");
let showcart = document.querySelector(".show-cart");
let allOrders = cart.querySelector(".orders").children;
let allCategories = [];
let allProducts = [];

// Fetch Products From DB
const getProducts = async function() {
  try {
    const response = await fetch(`../api/productsAPI.php`);
    allProducts = await response.json();
  } catch(error) {
    console.error('Error Fetching Products:', error);
    throw error;
  }
};

// Show Products In Page
let showProducts = function() {
  getProducts()
  .then(() => {
    for (let i = 0; i < allProducts.length; i++) {
      setProduct(i);
    }
  })
} ();

// Fetch Categories From DB
const getCategories = async function() {
  try {
    const response = await fetch(`../api/categoryAPI.php`);
    allCategories = await response.json();
  } catch(error) {
    console.error('Error Fetching Categories:', error);
    throw error;
  }
};

// Show Categories In Page
let ShowCategories = function() {
  getCategories()
  .then(() => {
    allCategories.push({ "id": 0, "img": "../images/landing-img.jpg", "name": "All Products"})
    setCategory(allCategories.length - 1);
    for (let i = 0; i < allCategories.length - 1; i++) {
      setCategory(i);
    }
  })
} ();

// Create Category Element In Page
let setCategory = function(i) {
  let category = document.createElement("div");
  let icon = document.createElement("i");
  let p1 = document.createElement("p");
  let items = document.createElement("p");

  category.classList.add("category", "py-3", "mx-1", "mb-4", "px-4", "text-center");
  icon.classList.add("mb-2", "fa-solid", "fa-mug-hot");
  p1.classList.add("m-0", "fw-bold");
  items.classList.add("m-0");
  p1.innerText= allCategories[i].name;

  let itemsCount = 0;
  for (let j = 0; j < allProducts.length; j++) {
    if(allCategories[i].id == 0) {
      itemsCount++;
    }
    else if (allProducts[j].category_id == allCategories[i].id) {
      itemsCount++;
    }
  }
  items.innerHTML=`<span>${itemsCount}</span> Items`;

  category.appendChild(icon);
  category.appendChild(p1);
  category.appendChild(items);
  categoryContainer.appendChild(category);
  
  category.addEventListener("click", ()=>showCategoryProducts(allCategories[i]));
};

// Create Order Element In Cart
let setOrder = function (productIdx, productId) {
  for(let i = 0; i < allOrders.length; i++) {
    let order = cart.querySelector(".orders").children[i];
    if(order.dataset.orderId == productId) {
      addOrder(order, allProducts[productIdx]);
      return;
    }
  }
  let newOrder = document.createElement("div");
  newOrder.classList.add("order", "center", "justify-content-between", "p-2", "m-1", "mb-2");
  newOrder.dataset.quantity = 0;
  newOrder.dataset.orderId = productId;
  let quantity = Number(newOrder.dataset.quantity);
  
  for(let i = 0; i < 4; i++) {
    newOrder.appendChild(document.createElement("div"));
  }

  let image = document.createElement("img");
  image.setAttribute("src", allProducts[productIdx].img);
  image.setAttribute("alt", allProducts[productIdx].name);
  newOrder.children[0].appendChild(image);
  
  newOrder.children[1].innerHTML =
    `<p class="m-0 fw-bold">${allProducts[productIdx].name}</p>
    <div class="counter d-flex">
      <span class="quantity">${quantity}</span>
      <button class="add fw-bold reset center mx-1">+</button>
      <button class="remove fw-bold reset center">-</button>
    </div>`;
  orderPrice(newOrder, allProducts[productIdx]);
  newOrder.children[3].innerHTML = `<button id="cancelOrder" class="cancel reset center text-danger"><i class="fa-regular fa-circle-xmark"></i></button>`;
  cart.querySelector(".orders").appendChild(newOrder);
  addOrder(newOrder, allProducts[productIdx]);
};

// Create Product Element In Page
let setProduct = function(i) {
  let product = document.createElement("div");
  let image = document.createElement("img");
  let data = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  
  product.classList.add("product", "mb-3", "text-center");
  product.setAttribute("id", "product");
  data.classList.add("data");
  p1.classList.add("product-name", "m-0", "p-2");
  p2.classList.add("price", "m-0", "p-2", "fw-bold");
  
  image.setAttribute("src", allProducts[i].img);
  image.setAttribute("alt", allProducts[i].name);
  
  p1.innerText = allProducts[i].name;
  p2.innerText = allProducts[i].price + " LE";

  product.appendChild(image);
  data.appendChild(p1);
  data.appendChild(p2);
  product.appendChild(data);
  productsContainer.appendChild(product);
  product.addEventListener("click", function(){
    setOrder(i, allProducts[i].id);
  });
} ;

// Make Actions On Orders In Cart (Add, Remove, Cancel)
cart.addEventListener("click", function(e) {
  let order = e.target.closest(".order");
  if(e.target.parentNode.classList.contains("cancel")) {
    order.remove();
    checkOrderExistance();
  }
  if(e.target.classList.contains("add")) {
    addOrder(order, allProducts[order.dataset.orderId]);
  }
  if(e.target.classList.contains("remove")) {
    removeOrder(order, allProducts[order.dataset.orderId]);
  }
});

// Add Order In Cart
let addOrder = function(order, product) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = ++quantity;
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order, product);
  checkOrderExistance();
}

// Remove Order From Cart
let removeOrder = function(order, product) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = --quantity;
  if(quantity == 0) {
    order.remove();
    checkOrderExistance();
    return;
  }
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order, product);
}

// Calculate Order Price
let orderPrice = function (order, product) {
  order.children[2].innerText = Number(order.dataset.quantity) * Number(product.price);
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

// Show Cart If It Has Orders
showcart.addEventListener("click", function(e) {
  if(allOrders.length > 0) {
    cart.classList.toggle("d-none");
  }
});

// Check If Cart Has Orders Or Not To Make Actions
let checkOrderExistance = function () {
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
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild);
  }

  productsElement.previousElementSibling.innerText = category.name;
  for (let i = 0; i < allProducts.length; i++) {
    if(category.id == 0) {
      setProduct(i);
    }
    else if(allProducts[i].category_id == category.id) {
      setProduct(i);
    }
  }
}

// Send Order
document.querySelector(".confirm").addEventListener("click", function() {
  let orderDetails = [];
  for(let i = 0; i < allOrders.length; i++) {
    let order = allOrders[i];
    let quantity = Number(order.querySelector(".quantity").innerText);
    orderDetails.push({ product_id: order.dataset.orderId, quantity: quantity });
  }
  let orderJSON = {customers_id: 1, products: orderDetails};
  sendOrder(orderJSON);
});

let sendOrder = async function (orderJSON) {
  try {
    const response = await fetch('../api/insertOrder.php', {
      method: 'POST',
      body: JSON.stringify(orderJSON)
    })
    .then(response => console.log( response.json()));
  } catch (error) {
    console.error('Error Sending Order:', error);
  }
}