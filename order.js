/**
 * This script takes command line arguments and generates a receipt to fulfill an order for a bakery
 * @author Sam Burke <sam.fitz.burke@gmail.com>
 * @date   2019/03/13
 */

//Ignore first two arguments given and store rest in global
const arguments = process.argv.slice(2)

//Check if we have the correct number of arguments
if(arguments.length != 2)
{
    console.log("Incorrect number of arguments")
    process.exit();
}

//Array of objects that contain all the information about the items in the bakery
const items = [{
    name: "Vegemite Scroll",
    code: "VS5",
    packs: [ 
        {amount: 3, cost: "6.99" },
        {amount: 5, cost: "8.99" }
     ]
},{
    name: "Blueberry Muffin",
    code: "MB11",
    packs: [ 
        {amount: 2, cost: "9.95" },
        {amount: 5, cost: "16.95" },
        {amount: 8, cost: "24.95" },
     ]
},{
    name: "Croissant",
    code: "CF",
    packs: [ 
        {amount: 3, cost: "5.95" },
        {amount: 5, cost: "9.95" },
        {amount: 9, cost: "16.99" },
    ]
}]

//Tries to find item code in items array using global arguments array
//Exits if unable to match a code
const findArgumentItem = () =>
{
    //Filters items array to find an item by checking arguments to see if arguments contain an items code
    let item = items.filter(item => arguments.includes(item.code))[0];
    if (item) return item;
    else {
        console.log("Unable to find product with that code")
        process.exit();
    } 
}

//Global that stores order item
let orderItem = findArgumentItem();


//Tries to find amount value in arguments 
//Exits if no number found
const findArgumentAmount = () =>
{
    //finds amount by filtering out the item code from arguments list
    let amount = arguments.filter(arg => orderItem.code != arg)[0]; 
    if (amount == parseInt(amount, 10)) return amount;
    else {
        console.log("Unable to find valid order amount")
        process.exit();
    } 
}

//global that stores order amount
let orderAmount = findArgumentAmount();

//Main funtion that tries fullfill order and prints out recipt to console
const getOrder = () => 
{
    //re-order packs object in the chosen item to be largest amount to smallest amount and return as array
    let packs = orderItem.packs.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount) );

    //set and initialise basic tracking variables
    let unfilledAmount = orderAmount
    let orderCost = 0;
    let orderPacks = 0;

    //create the header of receipt
    let orderReceipt = `\nReceipt for customer order of ${orderAmount} ${orderItem.name}'s \n\n---------------------\n`;
    
    //for each pack check:
    //  - if we have already fullfilled order
    //  - if amount in a pack is less than what is unfullfilled
    //  - if we use this pack multple times and theres a remainder will another pack that we offer be able fully fulfill this order
    //  - else if we use this pack one less time then its maxiumum will another pack that we offer be able fully fulfill this order
    packs.forEach((pack) => 
    {
        if (unfilledAmount != 0 && 
            pack.amount <= unfilledAmount && 
            packs.filter((otherPack) => (unfilledAmount % pack.amount) % otherPack.amount == 0 ).length != 0 )
        {
            //number of packs to be used
            let numOfPacks = Math.floor(unfilledAmount / pack.amount);
            
            orderPacks += numOfPacks;
            orderCost +=  pack.cost * numOfPacks;
            unfilledAmount = unfilledAmount % pack.amount
            
            //add line item to receipt
            orderReceipt += `${numOfPacks > 1 ? numOfPacks + " packs": "1 pack"} of ${pack.amount} @ $${pack.cost} each \n`
        } 
        else if(packs.filter((otherPack) => (unfilledAmount % pack.amount + pack.amount) % otherPack.amount == 0 ).length != 0 
            && unfilledAmount != 0 && 
            pack.amount <= unfilledAmount)  
        {
            //number of packs to be used less 1
            let numOfPacks = Math.floor(unfilledAmount / pack.amount) - 1;
            
            orderPacks += numOfPacks;
            orderCost +=  pack.cost * numOfPacks;
            unfilledAmount = unfilledAmount % pack.amount + pack.amount
            
            //add line item to receipt
            orderReceipt += `${numOfPacks > 1 ? numOfPacks + " packs": "1 pack"} of ${pack.amount} @ $${pack.cost} each \n`
        }
    })

    console.log(orderReceipt)
    console.log(`---------------------`)
    console.log(`Total cost $${orderCost.toFixed(2)} with ${orderPacks} packs\n`)

} 

//Executes the get order function that will print out receipt
getOrder();
