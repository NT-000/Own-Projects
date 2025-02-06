function updateOrdersView() {
    let ordersDiv = showOrdersCurrentUser();
    getAppDiv().innerHTML =   `
    <h1>${getCurrentUser().name}'s Ordered Books</h1>
    ${createNavButtons()}
    <div>${getOrderPage().errorHtml}</div>
    <button onclick="findOrder()">View Orders</button>
    <div>${ordersDiv}</div>
    `;
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