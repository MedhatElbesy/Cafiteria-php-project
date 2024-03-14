<?php

include("db.php");
$mydb = new DB();
$data = $mydb->query("SELECT
o.id AS order_id,
o.order_date,
o.status,
o.total_price,
c.fname,
c.lname,
c.room,
r.extNumber AS ext,
GROUP_CONCAT(
    JSON_OBJECT(
        'name', p.name,
        'img', p.img,
        'quantity', op.quantity,
        'price', op.price_unit
    )
) AS products
FROM
orders o
JOIN
customers c ON o.customers_id = c.id
JOIN
rooms r ON c.room = r.id
JOIN
order_product op ON o.id = op.order_id
JOIN
product p ON op.product_id = p.id
WHERE
o.status != 'done'
GROUP BY
o.id;
");
$status = $data->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($status);
