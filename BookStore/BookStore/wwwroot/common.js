function changeView(){
    if (getCurrentPage() == "loginpage") {
        updateLoginPageView();
        console.log("Navigating to loginpage");
    } else if (getCurrentPage() == "mainpage") {
        updateViewMainPage();
        console.log("Navigating to mainpage");
    } else if (getCurrentPage()== "orderpage") {
        updateOrdersView();
        console.log("Navigating to orderpage");
    } else if (getCurrentPage() == "boughtBooksPage") {
        updateBoughtBooksView();
        console.log("Navigating to rentpage");
     } else if(getCurrentPage()== "librarypage") {
        updateLibraryPageView();
        console.log("Navigating to librarypage");
    }
    else if (getCurrentPage() == "registerpage") {
        updateRegisterView();
        console.log("Navigating to registerpage");
    }
    
    // else if (getCurrentPage() == "searchpage") {
    //     updateSearchPageView();
    //     console.log("Navigating to searchpage");
    // }
}

function createNavButtons() {
    
    let buttons = '';
    buttons = `
    <button onclick="logoutUser()">Logout</button>
    <button onclick="navigateTo('mainpage')">Mainpage</button>
    <button onclick="navigateTo('orderpage')">Your Orders</button>
    <button onclick="navigateTo('boughtBooksPage')">Your Books</button>
    <button onclick="navigateTo('librarypage')">Library</button>
    
    `;
    return buttons;
}

async function fetchCustomers(){

    let result = await fetch(`/Customers`);
    return result.json();
}
async function fetchOrders(){
    let results = await fetch(`/Orders`);
    return results.json();
}
function logoutUser(){
    model.input.currentUser = null;
    emptyArrays();
    navigateTo('loginpage');
    console.log("currentUser logout:",model.input.currentUser);
}
function emptyArrays(){
    getMainPage().orders = [];
    getMainPage().books = [];
    getMainPage().authors = [];
    getMainPage().adminOrders = [];
}
function navigateTo(page) {
    model.app.currentPage = page;
    console.log("currentPage:", page);
    model.input.orderpage.isOpen = false;
    changeView();
}
async function fetchData(){
    await fetchBooks();
    await fetchAuthors();
    changeView();
    console.log("Orders in model:", getOrderPage().orders);
}

async function fetchBooks(){
    let response = await fetch('/Books');
    console.log(response);
    getMainPage().books = await response.json();
    console.log("fetch-Books:",model.input.mainpage.books);
}
async function fetchAuthors(){
    let response = await fetch('/Authors');
    console.log(response);
    getMainPage().authors = await response.json();
    console.log("fetchauthor",model.input.mainpage.authors);
}
function getAppDiv(){
    return document.getElementById('app');
}
function getCurrentPage(){
    return model.app.currentPage;
}
function getCurrentUser(){
    return model.input.currentUser;
}

function getResultHtml(){
    return model.input.librarypage.resultHtml;
}




