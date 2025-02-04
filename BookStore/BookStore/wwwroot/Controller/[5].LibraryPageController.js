function showBooks() {
    let books = getMainPage().books;
    if (books.length === 0) {
        return '';
    }
    console.log("show-books",books);
    return `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Published Year</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => {
        let author = getMainPage().authors.find(author => author.id === book.author_id);
        console.log("book:",book,"author", author);
        return  `
                    <tr>
                        <td>${book.id}</td>
                         <td>${author.name}</td>
                        <td>${book.title}</td>
                        <td>${book.genre}</td>
                        <td>${book.published_year}</td>
                        <td><input type="number" placeholder="How many..." oninput="getLibraryPage().inputQuantity=this.value"></td>
                        <td><button onclick="placeOrder(${book.id})">Order now</button></td>
                    </tr>
                `;
    }).join('')}
            </tbody>
        </table>
    `;
}

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

function bookTemplate(results){
    getLibraryPage().resultHtml = "";
    if (results.length > 0) {
        getLibraryPage().resultGenre = `
        
                        <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(book => {
            let author = getMainPage().authors.find(author => author.id === book.author_id);
            return `
                                <tr>
                                    <td>${book.title}</td>
                                    <td>${author.name}</td>
                                    <td>${book.genre}</td>
                                    <td>${book.published_year}</td>
                                    <td><input type="number" placeholder="How many..." oninput="getLibraryPage().inputQuantity=this.value"></td>
                                    <td><button onclick="placeOrder(${book.id})">Order now</button></td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                   
                </table>
        `;}
    else{
        getLibraryPage().resultGenre = `No books found...`;
    }
    updateLibraryPageView()
}
async function placeOrder(bookId){
    let customerId = getCurrentUser().id;
    let bookID = bookId;
    console.log("currentUserId::",customerId);
    let newOrder = {
        customer_id: customerId,
    };
    console.log(newOrder);
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
        quantity: getLibrarypage().inputQuantity || 1,
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
    (getLibraryPage())[status] = !(getLibraryPage())[status];
    updateLibraryPageView();
}
function getLibraryPage(){
    return model.input.librarypage;
}