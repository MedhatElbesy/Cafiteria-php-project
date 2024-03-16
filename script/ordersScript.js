import * as data from './LoggedUser.js';
import * as utility from './utilities.js';

let ordersTable = document.getElementById("orders");
let orderDetailsContainer = document.querySelector(".order-details");

let dateFrom = document.getElementById("date-from");
let dateTo = document.getElementById("date-to");

const getOrders = async function() {
  try {
    utility.loading();
    const response = await fetch(`../api/myorders.php?date_from=${dateFrom.value}&date_to=${dateTo.value}`);
    const myOrders = await response.json();
    utility.loading();
    return myOrders;
  } catch(error) {
    console.error('Error Fetching Orders:', error);
    throw error;
  }
};

const getOrderDetails = async function(orderId) {
  try {
    utility.loading();
    const response = await fetch(`../api/orderdetails.php?id=${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    const orderDetails = await response.json();
    utility.loading();
    return orderDetails;
  } catch(error) {
    console.error('Error Fetching Order Details:', error);
    window.location.reload();
  }
};

dateFrom.addEventListener("input", function() {
  getOrders()
  .then((myOrders)=>showOrders(myOrders))
});

dateTo.addEventListener("input", function() {
  getOrders()
  .then((myOrders) => showOrders(myOrders));
});

let showOrders = function(myOrders) {
  // Check Orders Existance 
  if (myOrders.length == 0) {
    ordersTable.children[1].innerHTML = `<tr><td colspan="4" class="text-danger text-center fw-bold">No Orders In Selected Date</td></tr>`;
    return;
  }

  // Check Orders Exist 
  ordersTable.children[1].innerHTML = "";
  myOrders.forEach((order, i) => {
    let currentOrder = document.createElement("tr");
    currentOrder.dataset.orderId = order.id;
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
    
    <!-- Check Status -->
    ${order.status == "processing" ?
    '<td class="text-center"><button type="button" class="cancel-order btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Cancel</button></td>'
    :'<td class="text-center">-</td>'}`
    ordersTable.children[1].appendChild(currentOrder);

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
      currentOrder.querySelector(".show-order").addEventListener("click", (e)=> {
        orderDetailsButton(e, order.id);
      });
    }
  });
};

let orderDetailsButton = function(e, orderId) {
  if(e.target.innerText == "+") {
    getOrderDetails(orderId)
    .then((orderDetails) => {
      ordersTable.querySelectorAll(".show-order").forEach((button)=> {
        button.innerText = "+";
      });
      orderDetailsContainer.classList.remove("d-none");
      e.target.innerText = "-";
      orderDetailsContainer.innerHTML = "";
      orderDetails.forEach((order) => {
        showOrderDetails(order);
      });
      
      // Add Total Price
      orderDetailsContainer.innerHTML += `<p class="total-price text-center fw-bold">Total ${orderDetails[0].total_price}</p>`
    });
  } else {
    orderDetailsContainer.classList.add("d-none");
    e.target.innerText = "+";
  }
}

let showOrderDetails = function(order) {
  let product = document.createElement("div");
  let image = document.createElement("img");
  let data = document.createElement("div");
  let name = document.createElement("p");
  let price = document.createElement("p");
  let quantity = document.createElement("p");
  
  product.classList.add("product", "mb-3", "text-center");
  product.setAttribute("id", "product");
  data.classList.add("data");
  name.classList.add("product-name", "m-0", "p-2");
  price.classList.add("price", "m-0", "p-2", "fw-bold");
  quantity.classList.add("quantity", "m-0", "p-2", "fw-bold");

  image.setAttribute("src", order.img);
  image.setAttribute("alt", order.name);

  name.innerText = order.name;
  price.innerText = order.price_unit + " LE";
  quantity.innerText = order.quantity;

  product.appendChild(image);
  data.appendChild(name);
  data.appendChild(price);
  data.appendChild(quantity);
  product.appendChild(data);
  orderDetailsContainer.appendChild(product);
};

// Cancel Order
ordersTable.addEventListener("click", function(e) {
  let order = e.target.closest("tr");
  if(e.target.classList.contains("cancel-order")) {
    let canceled = document.querySelector(".order-canceled");
    canceled.classList.remove("d-none");
    canceled.querySelector("#cancel").addEventListener("click", function() {
      cancelOrder(order);
      canceled.classList.add("d-none");
    });
    canceled.querySelector("#no").addEventListener("click", function() {
      canceled.classList.add("d-none");
    });
  }
});

let cancelOrder = async function (order) {
  try {
    utility.loading();
    const response = await fetch(`../api/cancelorder.php?id=${order.dataset.orderId}`);
    const responseData = await response.json();
    utility.loading();
    if(responseData.message != 0) {
      // Check If Order Details are Opened
      if(order.querySelector(".show-order").innerText == "-") {
        orderDetailsContainer.innerHTML = '';
        orderDetailsContainer.classList.add("d-none");
      }
      order.remove();
      // Check If It Is Last Order In Selected Date
      if(ordersTable.children[1].children.length == 0) {
        ordersTable.children[1].innerHTML = `<tr><td colspan="4" class="text-danger text-center fw-bold">No Orders In Selected Date</td></tr>`;
      }
    }
  } catch (error) {
    console.error('Error Canceling Order:', error);
    // window.location.href = 'error.html';
  }
};

function orderDateFormat(orderDate) {
  let date = orderDate.split(' ');
  return date[0];
}

let showTodayOrders = function() {
  dateFrom.value = new Date().toISOString().slice(0, 10);
  dateTo.value = new Date().toISOString().slice(0, 10);
  getOrders()
  .then((myOrders)=>showOrders(myOrders))
} ();