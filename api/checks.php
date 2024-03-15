<?php
  session_start();
  if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin"){
    include("db.php");
    $mydb = new DB();
    $data = $mydb->query("SELECT * FROM orders INNER JOIN customers ON orders.customers_id = customers.id INNER JOIN order_product ON orders.id = order_product.order_id INNER JOIN product ON order_product.product_id = product.id ORDER BY orders.customers_id, orders.order_date");
    $all_orders = $data->fetchAll(PDO::FETCH_ASSOC);

    // Group orders by user
    $grouped_orders = [];
    foreach ($all_orders as $order) {
      $user_id = $order['customers_id'];
      if (!isset($grouped_orders[$user_id])) {
        $grouped_orders[$user_id] = [
          'user_id' => $user_id,
          'user_name' => $order['fname'] . ' ' . $order['lname'],
          'total_amount' => 0,
          'orders' => []
        ];
      }

      $order_id = $order['id'];
      if (!isset($grouped_orders[$user_id]['orders'][$order_id])) {
        $grouped_orders[$user_id]['orders'][$order_id] = [
          'order_id' => $order_id,
          'order_date' => $order['order_date'],
          'total_price' => 0,
          'products' => []
        ];
      }

      $product_price = $order['price_unit'] * $order['quantity'];
      $grouped_orders[$user_id]['orders'][$order_id]['total_price'] += $product_price;
      $grouped_orders[$user_id]['total_amount'] += $product_price; // Accumulate total amount for the user
      $grouped_orders[$user_id]['orders'][$order_id]['products'][] = [
        'product_id' => $order['product_id'],
        'product_name' => $order['name'],
        'quantity' => $order['quantity'],
        'price' => $order['price_unit'],
        'total_product_price' => $product_price,
        'img' => $order['img']
      ];

      // Sort orders within each user by date in descending order
      usort($grouped_orders[$user_id]['orders'], function ($a, $b) {
        return strtotime($b['order_date']) - strtotime($a['order_date']);
      });
    }
    echo json_encode($grouped_orders);
  }