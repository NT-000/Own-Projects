
async function updateViewMainPage() {
if(getCurrentUser().isAdmin){
    await updateViewMainPageAdmin();
}
else{
    updateViewMainPageCustomer();
}
}

async function updateViewMainPageAdmin() {
    customerHtml = await GetCustomers();
    bannedUsers = await showBannedUsers();
    await fetchAllOrders();
    ordersHtml = await showAllOrders();
    let completedOrdersHtml = await getCompletedOrders('admin');
    console.log("completedOrdersAdmin",completedOrdersHtml);
    getAppDiv().innerHTML =
        `<h1>Welcome Admin, ${getCurrentUser().name}</h1>
       <h4>${getMainPage().mainPageErrorHtml}</h4>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
       <div onclick="closeOpenMainPage('isBannedOpen')"><h3>Banned Users</h3></div>
       ${getMainPage().isBannedOpen ? bannedUsers : ""}
       <div onclick="closeOpenMainPage('isUserOpen')"><h3>Users</h3></div>
       ${getMainPage().isUserOpen ? customerHtml : ""}
       <div class="allOrders">
       <h2 onclick="closeOpenMainPage('isOrdersOpen')">Pending orders</h2>
       ${getMainPage().isOrdersOpen ? ordersHtml : ""}
       <h2 onclick="closeOpenMainPage('isCompletedOrdersOpen')">Completed Orders</h2>
       ${getMainPage().isCompletedOrdersOpen ? completedOrdersHtml : ""}
</div>
</div>
<div class="banMenu">

</div>

</div>
        `;
}

async function updateViewMainPageCustomer() {
    let ordersHtml = await getCompletedOrders('user');
    console.log("completedOrdersCustomer",ordersHtml);
    getAppDiv().innerHTML =
        `<h1>Welcome ${getCurrentUser().name}</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
       <h2 onclick="closeOpenMainPage('isCompletedOrdersCustomerOpen')">Completed Orders</h2>
       ${getMainPage().isCompletedOrdersCustomerOpen ? ordersHtml : ""}
</div>
</div>    
        `;
}