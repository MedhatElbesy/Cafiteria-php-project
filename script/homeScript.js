let allProducts = [
  { "id": 1, "img": "../images/landing-img.jpg", "name": "Coffee", "price": 5, "category_id": 1},
  { "id": 2, "img": "../images/landing-img.jpg", "name": "Tea", "price": 10, "category_id": 1},
  { "id": 2, "img": "../images/landing-img.jpg", "name": "RedBull", "price": 10, "category_id": 2},
  { "id": 3, "img": "../images/landing-img.jpg", "name": "Cola", "price": 15, "category_id": 3},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Orange", "price": 20, "category_id": 4},
  { "id": 5, "img": "../images/landing-img.jpg", "name": "Mango", "price": 20, "category_id": 4},
  { "id": 3, "img": "../images/landing-img.jpg", "name": "Cola", "price": 15, "category_id": 3},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Orange", "price": 20, "category_id": 4},
  { "id": 5, "img": "../images/landing-img.jpg", "name": "Mango", "price": 20, "category_id": 4},
];

let allCategories = [
  { "id": 1, "img": "../images/landing-img.jpg", "name": "Hot Drinks"},
  { "id": 2, "img": "../images/landing-img.jpg", "name": "Cold Drinks"},
  { "id": 3, "img": "../images/landing-img.jpg", "name": "Soda"},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Juice"},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Juice"},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Juice"},
];

let categoryContainer = document.getElementById("categories");
let productsContainer = document.getElementById("products");
let cart = document.getElementById("cart");
let showcart = document.querySelector(".show-cart");
let allOrders = cart.querySelector(".orders").children;

let setCategory = function(i) {
  let category = document.createElement("div");
  let icon = document.createElement("i");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");

  category.classList.add("category", "py-3", "mx-1", "mb-4", "px-4", "text-center");
  icon.classList.add("mb-2", "fa-solid", "fa-mug-hot");
  p1.classList.add("m-0", "fw-bold");
  p2.classList.add("m-0");
  p1.innerText= allCategories[i].name;

  let items = 0;
  for (let j = 0; j < allProducts.length; j++) {
    if(allCategories[i].id == 0) {
      items++;
    }
    else if (allProducts[j].category_id == allCategories[i].id) {
      items++;
    }
  }
  p2.innerHTML=`<span>${items}</span> Items`;

  category.appendChild(icon);
  category.appendChild(p1);
  category.appendChild(p2);
  categoryContainer.appendChild(category);
  
  category.addEventListener("click", ()=>showCategoryProducts(allCategories[i]));
};

let setOrder = function (productId) {
  for(let i = 0; i < allOrders.length; i++) {
    let order = cart.querySelector(".orders").children[i];
    if(order.dataset.orderId == productId) {
      addOrder(order, allProducts[productId]);
      return;
    }
  }
  let newOrder = document.createElement("div");
  newOrder.classList.add("order", "center", "justify-content-between", "p-2", "m-1");
  newOrder.dataset.quantity = 0;
  newOrder.dataset.orderId = productId;
  let quantity = Number(newOrder.dataset.quantity);
  
  for(let i = 0; i < 4; i++) {
    newOrder.appendChild(document.createElement("div"));
  }

  let image = document.createElement("img");
  image.setAttribute("src", allProducts[productId].img);
  image.setAttribute("alt", allProducts[productId].name);
  newOrder.children[0].appendChild(image);
  
  newOrder.children[1].innerHTML =
    `<p class="m-0 fw-bold">${allProducts[productId].name}</p>
    <div class="counter d-flex">
      <span class="quantity">${quantity}</span>
      <button class="add fw-bold reset center mx-1">+</button>
      <button class="remove fw-bold reset center">-</button>
    </div>`;
  orderPrice(newOrder, allProducts[productId]);
  newOrder.children[3].innerHTML = `<button id="cancelOrder" class="cancel reset center text-danger"><i class="fa-regular fa-circle-xmark"></i></button>`;
  cart.querySelector(".orders").appendChild(newOrder);
  addOrder(newOrder, allProducts[productId]);
};

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
    setOrder(i);
  });
} ;

// Order
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

let addOrder = function(order, product) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = ++quantity;
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order, product);
  checkOrderExistance();
}

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

let orderPrice = function (order, product) {
  order.children[2].innerText = Number(order.dataset.quantity) * Number(product.price);
  totalcart();
}

let totalcart = function() {
  let cartPrice = 0;
  for (let i = 0; i < allOrders.length; i++) {
    cartPrice += Number(allOrders[i].children[2].innerText);
  }
  cart.querySelector(".cart-price").children[0].innerText = cartPrice;
};

showcart.addEventListener("click", function(e) {
  if(allOrders.length > 0) {
    cart.classList.toggle("d-none");
  }
});

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
    cart.classList.remove("d-lg-none");
    container.classList.add("col-lg-9");
    container.classList.remove("col-lg-12");
    showcart.classList.remove("empty");
    showcart.children[0].innerText = allOrders.length;
  }
}

// Category
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

let ShowAllProducts = function() {
  for (let i = 0; i < allProducts.length; i++) {
    setProduct(i);
  }
} ();

let ShowCategories = function() {
  allCategories.push({ "id": 0, "img": "../images/landing-img.jpg", "name": "All Products"})
  setCategory( allCategories.length - 1);
  for (let i = 0; i < allCategories.length - 1; i++) {
    setCategory(i);
  }
} ();