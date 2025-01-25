function changeView(){
    
    let currentPage = model.app.currentPage;

    if (currentPage == "loginpage") {
        updateLoginPageView();
        console.log("Navigating to loginpage");
    } else if (currentPage == "mainpage") {
        updateViewMainPage()
        console.log("Navigating to mainpage");
    } else if (currentPage== "orderpage") {
        updateOrdersView();
    }
     else if (currentPage == "rentpage") {
        updateRentedBooksView();}
   else if (currentPage == "registerpage") {
        updateRegisterView()
}}

function createNavButtons() {
    
    let buttons = '';
    buttons = `
    <button onclick="logoutUser()">Logout</button>
    <button onclick="goToMainPage()">Mainpage</button>
    <button onclick="goToLibraryPage()">Library/Order books</button>
    <button onclick="goToRentedBooksPage()">Rented books</button>
    `;
    return buttons;
}
function logoutUser(){
    model.input.currentUser = '';
    navigateTo('loginpage');
    console.log("currentUser:",model.input.currentUser);
}
function navigateTo(page) {
    model.app.currentPage = page;
    console.log("currentPage:", model.app.currentPage);
    changeView();
}
   
    async function fetchData(){
        await fetchBooks();
        await fetchAuthors();
        await fetchOrders();
        changeView();
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
async function fetchOrders(){
    let response = await fetch('/Orders');
    console.log(response);
    model.input.orderpage.orders = await response.json();
    console.log("orders",model.input.orderpage.orders);
}