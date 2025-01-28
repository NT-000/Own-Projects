async function findOrder(){
    let response = await fetch("/Orders")
    let orders = await response.json();
    console.log("Orders fetched(findOrder):", orders);

    for(let order of orders){
        if(getCurrentUser().id == order.customer_id){
            await showOrderItem(order)
        }
    }
    console.log("Final orders in model:", model.input.orderpage.orders);
    updateOrdersView()
}
async function showOrderItem(order){
    let response = await fetch("/OrderItems")
    let orderItems = await response.json();
    for(let orderItem of orderItems){
        if(orderItem.order_id === order.id){
            model.input.orderpage.orders.push(orderItem);
        }
    }
    model.input.orderpage.isOpen = true;
    console.log("orders in model(showOrderItem):",model.input.orderpage.orders);
}
function showOrdersCurrentUser(){
    model.input.orderpage.inputHtml = "";
    if(model.input.orderpage.isOpen) {

        for (let order of model.input.orderpage.orders) {
            let foundBook = model.input.mainpage.books.find(book => book.id == order.book_id);
            let foundAuthor = model.input.mainpage.authors.find(author => foundBook.author_id == author.id);
            // let foundDate  = findOrderDate(foundBook);
            if (foundBook) {
                model.input.orderpage.inputHtml +=  `
            <h2>Order: ${order.order_id}</h2>
           <div>Title: ${foundBook.title}</div>
           <div>Author: ${foundAuthor.name}</div>
           <div>Genre: ${foundBook.genre}</div>
           <div>Year: ${foundBook.published_year}</div>
           <div>Amount: ${order.quantity}</div>
           `
            }
            }
        
        return model.input.orderpage.inputHtml;
    }
    else{
        return "";
    }
    updateOrdersView();
}
// async function findQuantity(foundBook){
//     let quantity = 0;
//     let response = await fetch("/Orders")
//     let orders = await response.json();
//     for(let order of orders){
//         if(getCurrentUser().id == order.id && ){
//            quantity += order.quantity
//         }
//     }
//     return quantity;
// }
