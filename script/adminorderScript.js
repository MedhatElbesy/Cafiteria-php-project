const getOrders = async function() {
  try {
    const response = await fetch(`../api/adminorders.php`);
    const orders = await response.json();
    return orders;
  } catch(error) {
    window.location.href = 'error.html';
    console.error('Error Fetching Orders:', error);
    throw error;
  }
};

const getOrderDetails = async function(orderId) {
  try {
    const response = await fetch(`../api/orderdetails.php?id=${orderId}`);
    const orderDetails = await response.json();
    return orderDetails;
  } catch(error) {
    console.error('Error Fetching Order Details:', error);
    window.location.href = 'error.html';
  }
};