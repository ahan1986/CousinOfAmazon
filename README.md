# CousinOfAmazon

## Overview
This app is an Amazon-like storefront with MySQL.  The app will take in orders from customers and deplete stock from the store's inventory. 
This also allows managers to add more to their inventory and add new products to their list for the customers.

Here is a link to show you the Customers view on the app:

[Google Drive] (https://drive.google.com/file/d/1o2AXKgvRDU3wnFZhr92EfYggwOJzYCf-/view)

Bamazon Customer:

The video will show at the start there will be items to be selected with an ID, product name, and the price.  Once you've clicked on an item, another message will pop up and ask how many you would like to purchase this item.  Once you've plugged in a number, it will subtract that number to the stock_quantity in the database products.  If you've asked for a huge amount and there isn't enough in stock, a message will pop up that there is 'insufficient quantity'.  After few seconds, it will go back to the top and display all the items again.

Here is a link to show you the Managers view on the app:

[Google Drive] (https://drive.google.com/file/d/1LfOIXzN1pViNhFedbo1fxPkIVQNv0gUX/view)

Bamazon Manager:

In this example, you are the manager looking at your inventory.  You are given four choices:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add new product

* If you select `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

* If you selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

* If you selects `Add to Inventory`, your app should display a prompt that will let you "add more" of any item currently in the store.

* If you selects `Add New Product`, it should allow you to add a completely new product to the store.
