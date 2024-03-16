# Cafetria Project

Cafetria is a web application developed using PHP and JavaScript, designed to manage cafeteria orders. The project consists of two main parts: the Admin View and the User View.

## Features

### User View

1. **Login Page**:
   - Users can log in using their username and password.
   - Forgot password functionality is available, which redirects users to a page to reset their password.

2. **Home Page**:
   - Users can select their orders from a list of products.
   - Product images are clickable, allowing users to add items to their cart.
   - Users can adjust the quantity of products and add notes to their order.
   - Room selection is available via a combo box.
   - Total amount to be paid is displayed.
   - Users can confirm their orders, which are then submitted.
   - The latest order is displayed at the top of the page.

### Admin View

1. **Home Page**:
   - Admins can create orders for users selected from a dropdown menu.

2. **Order Management**:
   - Admins can view user orders and total prices within a specified date range.
   - Order statuses include "Processing," "Out for Delivery," and "Done."
   - Only orders with a "Processing" status can be canceled.
   - Clicking on an order displays its contents.

3. **Product Management**:
   - Admins can view all products and add or remove them.
   - Products are categorized, and admins can add new categories.

4. **User Management**:
   - Admins can view, edit, and delete users.
   - A form is provided to add new users.

5. **Checks**:
   - Admins can view all checks within a specified date range.
   - Checks can be filtered by specific users.
   - Clicking on a username displays their order information during the specified time period.

6. **Orders**:
   - Admins can check their current orders to be processed.

## Supervision

This project is supervised by [Hend Samir] Teaching Assistant of the Open Source Department at the Information Technology Institute (ITI), Ministry of Communications and Information Technology.

## Usage

To use Cafetria, simply clone the repository and deploy the PHP files on a server that supports PHP. Make sure to set up the necessary database configurations and dependencies as specified in the project files.


## Acknowledgments

We would like to thank the Teaching Assistant and the Information Technology Institute for their guidance and support throughout the development of this project.
