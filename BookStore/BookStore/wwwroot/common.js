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
    } else if (getCurrentPage() == "rentpage") {
        updateRentedBooksView();
        console.log("Navigating to rentpage");
     } else if(getCurrentPage()== "librarypage") {
        updateLibraryPageView();
        console.log("Navigating to librarypage");
    }
    else if (getCurrentPage() == "registerpage") {
        updateRegisterView();
        console.log("Navigating to registerpage");
    }
    else if (getCurrentPage() == "searchpage") {
        updateSearchPageView();
        console.log("Navigating to searchpage");
    }
}

function createNavButtons() {
    
    let buttons = '';
    buttons = `
    <button onclick="logoutUser()">Logout</button>
    <button onclick="navigateTo('mainpage')">Mainpage</button>
    <button onclick="navigateTo('orderpage')">Your Orders</button>
    <button onclick="navigateTo('rentpage')">Rented books</button>
    <button onclick="navigateTo('librarypage')">Library</button>
    
    `;
    return buttons;
}
function logoutUser(){
    model.input.currentUser = '';
    emptyArrays();
    navigateTo('loginpage');
    console.log("currentUser logout:",model.input.currentUser);
}
function emptyArrays(){
    model.input.orderpage.orders = [];
    model.input.mainpage.books = [];
    model.input.mainpage.authors = [];
}
function navigateTo(page) {
    model.app.currentPage = page;
    console.log("currentPage:", model.app.currentPage);
    model.input.orderpage.isOpen = false;
    changeView();
}
   
    async function fetchData(){
        await fetchBooks();
        await fetchAuthors();
        changeView();
        console.log("Orders in model:", model.input.orderpage.orders);
    }

async function fetchBooks(){
    let response = await fetch('/Books');
    console.log(response);
    model.input.mainpage.books = await response.json();
    console.log("fetch-Books:",model.input.mainpage.books);
}
async function fetchAuthors(){
    let response = await fetch('/Authors');
    console.log(response);
    model.input.mainpage.authors = await response.json();
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