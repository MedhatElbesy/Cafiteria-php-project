const orderDetails = [];
const allOrders = [];

const getOrderDetails = async function() {
  try {
    const response = await fetch('../api/orderdetails.php');
    
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    
    orderDetails = await response.json();
    console.log('Order details:', orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error.message);
  }
};

const getOrders = async function() {
  try {
    const response = await fetch('../api/myorders.php');
    allOrders = await response.json();
  } catch(error) {
    console.log(error);
  }
} ();

let ordersTable = document.getElementById("orders");
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
  allOrders.forEach((order, i) => {
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
      
      <!-- Check Status -->
      ${order.status == "processing" ?
      '<td class="text-center"><a href="#" title="cancel" class="cancel-order btn btn-danger">Cancel</a></td>'
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
        currentOrder.querySelector(".show-order").addEventListener("click", (e)=> {showOrderButton(e, order.id, i)});
      }
    }
  });
};

let showOrderButton = function(e, orderId, orderIndex) {
  if(e.target.innerText == "+") {
    ordersTable.querySelectorAll(".show-order").forEach((button)=>{
      button.innerText = "+";
    });
    productsContainer.classList.remove("d-none");
    e.target.innerText = "-";
    productsContainer.innerHTML = "";
    orderDetails.forEach((order, orderIndex) => {
      if(order.id == orderId) {
        showOrderDetails(orderIndex);
      }
    });
    // Add Total Price
    productsContainer.innerHTML += `<p class="total-price text-center fw-bold">Total ${allOrders[orderIndex].total_price}</p>`
  } else {
    productsContainer.classList.add("d-none");
    e.target.innerText = "+";
  }
}

let showOrderDetails = function(orderIndex) {
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

  image.setAttribute("src", "../images/landing-img.jpg");
  // image.setAttribute("src", orderDetails[i].img);
  image.setAttribute("alt", orderDetails[orderIndex].name);

  name.innerText = orderDetails[orderIndex].name;
  price.innerText = orderDetails[orderIndex].price_unit + " LE";
  quantity.innerText = orderDetails[orderIndex].quantity;
  

  product.appendChild(image);
  data.appendChild(name);
  data.appendChild(price);
  data.appendChild(quantity);
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