# Bakery Order System

This system uses javascript to generate and print out a receipt for a customers order.

Make sure you are in the same directory as order.js and have [Node.js](https://nodejs.org/en/download/) installed. 

To run execute the following in your console:

```node order.js <amount> <code>```

The script will then print out a receipt that fulfills an order with the optimal number of packs for any given item.

Examples include:
* ```node order.js 10 VS5```
* ```node order.js MB11 14```
* ```node order.js 13 CF```

Argument order does not matter as the script will do it's best to determine order amount from order code.

To fulfill the order we first get an array of our packs for the chosen item. Pack objects contain the amount in the pack and the cost of the pack. This array is sorted from highest amount in a pack to lowest.

We then loop through each pack and check the following:
1. check if we have already fulfilled order
2. check if amount in a pack is less than what is unfulfilled
3. check if we use this pack multiple times and theres a remainder will another pack that we offer be able fully fulfill this order
4. else if check 1 and 2 pass, check if we use this pack one less time then its maximum will another pack that we offer be able fully fulfill this order (this step can obviously be repeated multiple times but for this exercise I just did it once)

If the pack passes the checks then apply this to the order:
- Add amount of packs used to total
- Add total cost of packs to total for order
- Generate and add line item to receipt

When order is fulfilled then we print out the receipt to the console.

Example output below:

```
node order.js 13 CF

Receipt for customer order of 13 Croissant's 

---------------------
2 packs of 5 @ $9.95 each 
1 pack of 3 @ $5.95 each 

---------------------
Total cost $25.85 with 3 packs
