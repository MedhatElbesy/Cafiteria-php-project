let allProducts = [
  { "id": 1, "img": "../images/landing-img.jpg", "name": "Coffee", "price": 5, "category_id": 1},
  { "id": 2, "img": "../images/landing-img.jpg", "name": "Tea", "price": 10, "category_id": 2},
  { "id": 3, "img": "../images/landing-img.jpg", "name": "Cola", "price": 15, "category_id": 3},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Orange", "price": 20, "category_id": 4},
];

let allCategories = [
  { "id": 1, "img": "../images/landing-img.jpg", "name": "Hot Drinks"},
  { "id": 2, "img": "../images/landing-img.jpg", "name": "Cold Drinks"},
  { "id": 3, "img": "../images/landing-img.jpg", "name": "Soda"},
  { "id": 4, "img": "../images/landing-img.jpg", "name": "Juice"},
];

let categoryContainer = document.getElementById("categories");
let productsContainer = document.getElementById("products");
let bill = document.getElementById("bill");

let setCategory = function() {
  for (let i =0; i < allCategories.length ; i++) {
    let category = document.createElement("div");
    let icon = document.createElement("i");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
  
    category.classList.add("category", "py-3", "mx-1", "mb-2", "px-4", "text-center");
    icon.classList.add("mb-2", "fa-solid", "fa-mug-hot");
    p1.classList.add("m-0", "fw-bold");
    p2.classList.add("m-0");
    p1.innerText= allCategories[i].name;
    p2.innerHTML="<span>200</span> Items";
  
    category.appendChild(icon);
    category.appendChild(p1);
    category.appendChild(p2);
    categoryContainer.appendChild(category);

    category.addEventListener("click", ()=>showCategoryProducts(allCategories[i].id));
  }
} ();

let setOrder = function (productId) {
  let allOrders = bill.children[1].children;
  for(let i = 0; i < allOrders.length; i++) {
    let order = bill.children[1].children[i];
    if(order.dataset.orderId == productId) {
      addOrder(order, allProducts[productId]);
      return;
    }
  }
  
  let newOrder = bill.children[1].insertRow();
  newOrder.classList.add("order", "center", "justify-content-between", "p-2", "mb-2");
  newOrder.dataset.quantity = 1;
  newOrder.dataset.orderId = productId;
  let quantity = Number(newOrder.dataset.quantity);
  
  for(let i = 0; i < 4; i++) {
    newOrder.insertCell(0);
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
};

let setProduct = function(i) {
  let product = document.createElement("div");
  let image = document.createElement("img");
  let data = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  
  product.classList.add("product", "m-0", "mb-2", "text-center");
  product.setAttribute("id", "product");
  data.classList.add("data");
  p1.classList.add("product-name", "m-0", "p-2");
  p2.classList.add("price", "m-0", "p-2", "fw-bold");
  
  image.setAttribute("src", allProducts[i].img);
  image.setAttribute("alt", allProducts[i].name);
  
  p1.innerText = allProducts[i].name;
  p2.innerText = allProducts[i].price + " LE / Item";

  product.appendChild(image);
  data.appendChild(p1);
  data.appendChild(p2);
  product.appendChild(data);
  productsContainer.appendChild(product);

  product.addEventListener("click", ()=>setOrder(i));
} ;


// Order
// let orderExistance = function() {
//   console.log(bill.children[1].children.length);
//   if(bill.children[1].children.length > 0) {
//     document.getElementsByTagName("main")[0].classList.add("col-8");
//     bill.classList.remove("d-none");
//   }
// }

bill.addEventListener("click", function(e) {
  let order = e.target.closest("tr");
  if(e.target.parentNode.classList.contains("cancel")) {
    order.remove();
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
}

let removeOrder = function(order, product) {
  let quantity = Number(order.dataset.quantity);
  order.dataset.quantity = --quantity;
  if(quantity == 0) {
    order.remove();
    return;
  }
  order.querySelector(".quantity").innerText = quantity;
  orderPrice(order, product);
}

let orderPrice = function (order, product) {
  order.children[2].innerText = Number(order.dataset.quantity) * Number(product.price);
  totalBill();
}

let totalBill = function() {
  let allOrders = bill.children[1].children;
  let billPrice = 0;
  for (let i = 0; i < allOrders.length; i++) {
    billPrice += Number(allOrders[i].children[2].innerText);
  }
  bill.querySelector(".bill-price").getElementsByTagName("span")[1].innerHTML = billPrice;
};

// Category
let showCategoryProducts = function(categoryId) {
  for (let i = 0; i < allProducts.length; i++) {
    if(allProducts[i].category_id == categoryId) {
      setProduct(i);
    }
  }
}
let addAllProducts = function() {
  for (let i = 0; i < allProducts.length; i++) {
    setProduct(i);
  }
} ();





/* <div class="product text-center m-0">
  <img src="../images/landing-img.jpg" alt="Product">
  <div class="data">
    <p class="product-name m-0 p-2">Tea</p>
    <p class="price m-0 p-2 fw-bold">200 LE / item</p>
  </div>
</div> 

<tr class="order center justify-content-between p-2 mb-4">
  <td>
    <img src="../images/landing-img.jpg" height="30" width="30" alt="coffee">
  </td>
  <td>
    <p class="m-0 fw-bold">Tea</p>
    <div class="counter d-flex">
      <span><sup class="text-black">x</sup>2</span>
      <button class="fw-bold reset center mx-1">+</button>
      <button class="fw-bold reset center">-</button>
    </div>
  </td>
  <td class="total">200 LE</td>
  <td><button class="cancel reset center text-danger"><i class="fa-regular fa-circle-xmark"></i></button></td>
</tr>
*/