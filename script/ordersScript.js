
let allOrders = [
  {"id": 1, "order_date": "2023-02-04 12:00:00", "status": "processing", "total_price": "100", "customers_id": 1},
  {"id": 2, "order_date": "2023-03-04 12:00:00", "status": "processing", "total_price": "250", "customers_id": 1},
  {"id": 3, "order_date": "2023-04-04 12:00:00", "status": "out for delevery", "total_price": "200", "customers_id": 1},
  {"id": 4, "order_date": "2023-05-04 12:00:00", "status": "out for delevery", "total_price": "600", "customers_id": 1},
  {"id": 5, "order_date": "2023-06-04 12:00:00", "status": "done", "total_price": "300", "customers_id": 1},
  {"id": 6, "order_date": "2023-07-04 12:00:00", "status": "done", "total_price": "400", "customers_id": 1},
];

let orderDetails = [
  {"id": 1, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Hot Drinks"},
  {"id": 1, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Cold Drinks"},
  {"id": 1, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Soda"},
  {"id": 2, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Juice"},
  {"id": 2, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Juice"},
  {"id": 3, "img": "../images/landing-img.jpg", "price": "100", "quantity": "2", "name": "Juice"},
];

let ordersTable = document.getElementById("orders");
let totalPrice = document.querySelector('[data-total]');
let productsContainer = document.querySelector(".order-details");

let dateFrom = document.getElementById("date-from");
let dateTo = document.getElementById("date-to");

dateFrom.value = "2023-01-01";
dateTo.value = new Date().toISOString().slice(0, 10);

dateFrom.addEventListener("input", function() {
  showOrders(dateFrom.value, dateTo.value);
});

dateTo.addEventListener("input", function() {
  showOrders(dateFrom.value, dateTo.value);
});

let showOrders = function(dateFrom, dateTo) {
  ordersTable.children[1].innerHTML = "";
  let total =  Number(totalPrice.dataset.total);
  allOrders.forEach(order => {
    if(orderDateFormat(order.order_date) >= dateFrom && orderDateFormat(order.order_date) <= dateTo) {
      let currentOrder = document.createElement("tr");
      currentOrder.innerHTML +=
      `<td class="d-flex align-items-center">
        <span class="fw-bold reset ml-2">${order.order_date}</span> 
        <button type="button" class="show-order btn btn-secondary mx-2 fw-bold">+</button>
      </td>
      <td>
        <span class="status badge p-2">${order.status}</span>
      </td>
      <td>
        <span class="fw-bold">${order.total_price}</span>
      </td>
      ${order.status == "processing" ?
      '<td class="text-center"><a href="#" title="cancel" class="cancel-order btn btn-danger">Cancel</a></td>'
      :'<td class="text-center">-</td>'}`
      ordersTable.children[1].appendChild(currentOrder);

      total += Number(order.total_price);
      totalPrice.children[0].innerText = total;

      // Check Status
      let status = currentOrder.querySelector(".status");
      if(order.status == "done") {
        status.style.backgroundColor = "green";
      } else if(order.status == "out for delevery") {
        status.style.backgroundColor = "#a43e00";
      } else {
        status.style.backgroundColor = "#0093a4";
      }
      
      // Add Event Click To Show Order Details
      if(currentOrder.querySelector(".show-order")) {
        currentOrder.querySelector(".show-order").addEventListener("click", (e)=> {showOrderButton(e, order.id)});
      }
    }
  });
};

let showOrderButton = function(e, orderId) {
  if(e.target.innerText == "+") {
    ordersTable.querySelectorAll(".show-order").forEach((button)=>{
      button.innerText = "+";
    });
    productsContainer.classList.remove("d-none");
    e.target.innerText = "-";
    productsContainer.innerHTML = "";
    orderDetails.forEach((order, i) => {
      if(order.id == orderId){
        showOrderDetails(i);
      }
    });
  } else {
    productsContainer.classList.add("d-none");
    e.target.innerText = "+";
  }
}

let showOrderDetails = function(i) {
  let product = document.createElement("div");
  let image = document.createElement("img");
  let data = document.createElement("div");
  let name = document.createElement("p");
  let price = document.createElement("p");
  let quantity = document.createElement("span");

  product.classList.add("product", "mb-3", "text-center");
  product.setAttribute("id", "product");
  data.classList.add("data");
  name.classList.add("product-name", "m-0", "p-2");
  price.classList.add("price", "m-0", "p-2", "fw-bold");
  quantity.classList.add("quantity");

  image.setAttribute("src", orderDetails[i].img);
  image.setAttribute("alt", orderDetails[i].name);

  name.innerText = orderDetails[i].name;
  price.innerText = orderDetails[i].price + " LE";

  product.appendChild(image);
  data.appendChild(name);
  data.appendChild(price);
  product.appendChild(data);
  productsContainer.appendChild(product);
};

ordersTable.addEventListener("click", function(e){
  let order = e.target.closest("tr");
  if(e.target.classList.contains("cancel-order")) {
    console.log(order);
    order.remove();
  }
});

function orderDateFormat(orderDate) {
  let date = orderDate.split(' ');
  return date[0];
}

showOrders(dateFrom.value, dateTo.value);