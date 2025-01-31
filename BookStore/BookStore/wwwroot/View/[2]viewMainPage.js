
function updateViewMainPage() {
if(getCurrentUser().isAdmin){
    updateViewMainPageAdmin();
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
    getAppDiv().innerHTML =
        `<h1>Welcome Admin, ${model.input.currentUser.name}</h1>
       <h4>${model.input.mainpage.mainPageErrorHtml}</h4>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
       <div onclick="closeOpenMainPage('isBannedOpen')"><h3>Banned Users</h3></div>
       ${model.input.mainpage.isBannedOpen ? bannedUsers : ""}
       <div onclick="closeOpenMainPage('isUserOpen')"><h3>Users</h3></div>
       ${model.input.mainpage.isUserOpen ? customerHtml : ""}
       <div class="allOrders">
       <h2 onclick="closeOpenMainPage('isOrdersOpen')">Pending orders</h2>
       ${model.input.mainpage.isOrdersOpen ? ordersHtml : ""}
</div>
</div>
<div class="banMenu">

</div>

</div>
        `;
}

function updateViewMainPageCustomer() {
    getAppDiv().innerHTML =
        `<h1>Welcome ${model.input.currentUser.name}</h1>
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
</div>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
</div>    
        `;
}