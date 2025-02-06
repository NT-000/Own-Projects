

async function searchBooksByYear() {
    let response = await fetch(`Books/Search/${getInputYear()}`)
    let results = await response.json();
    console.log("searchBookYear:",results);
    bookTemplate(results);
    }

async function searchBooksByTitle() {
    let response = await fetch(`Books/SearchName/${getInputSearchTitle()}`)
    let results = await response.json();
    console.log("searchBookByTitle:",results);
    bookTemplate(results);
}
async function searchBooksByGenre() {
    getLibraryPage().resultGenre = "";
    let genre = getLibraryPage().inputGenre;
    let response = await fetch(`/Books/${genre}`);
    let books = await response.json();
    bookTemplate(books);
}


async function placeOrder(bookId){
    let customerId = getCurrentUser().id;
    let bookID = bookId;
    console.log("currentUserId::",customerId);
    let newOrder = {
        customer_id: customerId,
    };
    console.log("newOrder(placeOrder):",newOrder);
    try{
        let response = await fetch(`/Orders`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOrder),
        });
        console.log(response);
        if (response.ok) {
            let newlyOrder = await response.json();
            console.log("Order response:", newlyOrder);
            console.log("The order is placed!:", response);
            await newOrderItem(bookID, newlyOrder.id);
        }
        else{
            console.log("error(placeOrder)");
        }
    }
    catch(error){
        console.log("error, server")
    }

}

async function newOrderItem(bookid, newOrderId){
    let newOrderItem = {
        order_id: newOrderId,
        book_id: bookid,
        quantity: getLibraryPage().inputQuantity || 1,
    };
    try{
        let response = await fetch(`/OrderItems`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOrderItem),
        });
        if (response.ok) {
            console.log("The orderItem is placed!:", response);
            updateOrdersView();
        }
        else{
            console.log("error");
        }
    }
    catch(error){
        console.log("error, server")
    }
}

function getInputYear(){
    return getLibraryPage().inputYear;
}
function getInputSearchTitle(){
    return getLibraryPage().inputSearchTitle;
}

function closeOpenLibraryPage(status) {
    getLibraryPage()[status] = !getLibraryPage()[status];
    updateLibraryPageView();
}
function getLibraryPage(){
    return model.input.librarypage;
}