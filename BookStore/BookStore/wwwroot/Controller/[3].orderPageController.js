async function findOrder(){
    let response = await fetch("/Orders")
    let orders = await response.json();
    console.log("Orders fetched(findOrder):", orders);
    if(!getOrderPage().isOpen) {
        getOrderPage().orders = [];
        for (let order of orders) {
            if (getCurrentUser().id == order.customer_id) {
                await showOrderItem(order)
            }
        }
    }
    console.log("Final orders in model:", getOrderPage().orders);
    updateOrdersView()
}
async function showOrderItem(order){
    let response = await fetch("/OrderItems")
    let orderItems = await response.json();
    for(let orderItem of orderItems){
        if(orderItem.order_id === order.id){
            getOrderPage().orders.push(orderItem);
        }
    }
    getOrderPage().isOpen = true;
    console.log("orders in model(showOrderItem):",getOrderPage().orders);
}
function showOrdersCurrentUser(){
    getOrderPage().inputHtml = "";
    console.log("Orders current user");

    function getMainpage() {
        return model.input.mainpage;
    }

    if(getOrderPage().isOpen) {

        for (let order of getOrderPage().orders) {
            let foundBook = getMainpage().books.find(book => book.id == order.book_id);
            let foundAuthor = getMainPage().authors.find(author => foundBook.author_id == author.id);
            if (foundBook) {
                getOrderPage().inputHtml +=  `
            <h2>Order: ${order.order_id}</h2>
           <div>Title: ${foundBook.title}</div>
           <div>Author: ${foundAuthor.name}</div>
           <div>Genre: ${foundBook.genre}</div>
           <div>Year: ${foundBook.published_year}</div>
           <div>Amount: ${order.quantity}</div>
           <button onclick="deleteOrder(${order.order_id})">Cancel Order</button>
           `;
            }
            }
        
        return getOrderPage().inputHtml;
    }
    else{
        return "";
    }
    
}
async function deleteOrder(id){
    getOrderPage().errorHtml = "";
    console.log("Id (deleteorder)",id);
    let response = await fetch(`/Orders/${id}`, {
        method: "DELETE",
    });
    let text = await response.text();
    console.log("Response from delete:", text);
    if(response.ok){
        getOrderPage().errorHtml = `<h2>Order: ${id} is deleted...</h2>`;
        navigateTo('orderpage');
    }
    else{
        getOrderPage().errorHtml = "Error";
    }
    
}
function getOrderPage(){
    return model.input.orderpage;
}
