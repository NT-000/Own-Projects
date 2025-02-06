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
