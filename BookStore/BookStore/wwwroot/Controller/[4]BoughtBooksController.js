
async function addPurchasedBook(book_id, customer_id) {
    console.log("Adding new order with ID:", book_id, "customer id:", customer_id);
    let newCustomerBook = {
        book_id: book_id,
        customer_id: customer_id,
    }
    let response = await fetch(`/CustomerBooks`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCustomerBook),
    })
    if(response.ok){
        await updateViewMainPageAdmin();
        console.log("Book acquired(AddpurchasedBook):", newCustomerBook);
    }
    else{
        console.log("Something went wrong(AddpurchasedBook)");
    }
    
}
async function fetchOrderItems(customerId,orderId) {
    console.log("inside fetorderItems order id:", orderId);
    let response = await fetch(`/OrderItems`);
    let orderItems = await response.json();
    console.log("orderItems insideFetchItems",orderItems);
    let foundBook = orderItems.find(item => item.order_id == orderId);
    console.log("foundbook:",foundBook);
    await addPurchasedBook(foundBook.book_id, customerId);
}

async function fetchCompletedOrders(orderId) {
    let response = await fetch('/Orders/FalseOrders');
    let orders = await response.json();
    console.log("orders fetchCompleted:",orders);
    let ordersArray = orders.result;
    let order = ordersArray.find(order => order.id === orderId);
    if (order) {
        console.log("Order found:", order);
        await fetchOrderItems(order.customer_id, orderId);
    } else {
        console.log("Order not found for ID:", orderId);
    }
}

async function fetchPurchasedBooks(){
    let id = getCurrentUser().id;
    let html = "";
    let response = await fetch(`/CustomerBooks/${id}`);
    getCurrentUser().bookInventory = await response.json();
    let answer = await fetch(`/Authors`);
    let authors = await answer.json();
    for(book of getCurrentUser().bookInventory){
        let author = authors.find(a => a.id === book.author_id);
        html += `
        <hr>
        <strong>Title: ${book.title}</strong>
        <div>Genre: ${book.genre}</div>
        <div>Author: ${author.name}</div>
        <div>Year: ${book.published_year}</div>
        <hr>
        `;
    }
    return html;
}

function isOpenClosedBoughtBooksPage(){
    getBoughtBooksPage().isBoughtBooksOpen = !getBoughtBooksPage().isBoughtBooksOpen;
    updateBoughtBooksView();
}

function getBoughtBooksPage(){
    return model.input.boughtBooksPage;
}