
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

async function showAllOrders(){
    let html = "";

    let users = await fetchCustomers();
    for(let order of getMainPage().adminOrders){
        let customer = users.find(user => user.id === order.customer_id);
        html+= `
        <h3>Order: ${order.id}</h3>
        <div>Email: ${customer.email}</div>
        <div>Order date: ${new Date(order.order_date).toLocaleDateString()}</div>
        <div>Customer name: ${customer.name}</div>
        <button onclick="updateOrder(${order.id})">Confirm order</button>
       <hr> `;
    }
    return html;
}

async function getCompletedOrders(condition){
    console.log("condition", condition);
    let id = getCurrentUser().id;
    console.log("id completeorders:",id);
    let isAdmin = getCurrentUser().isAdmin;
    console.log("isAdmin completeorders:", isAdmin);
    let response = await fetch(`/Orders/${id}/CompletedOrders?isAdmin=${isAdmin}`);
    let completedOrders = await response.json();
    console.log("getCompletedOrders, json",completedOrders);
    let users = await fetchCustomers();
    if(condition === 'admin') {
        getMainPage().mainpageAdminHtml = "";
        for(order of completedOrders){
            let user = users.find(user => user.id === order.customer_id);
            getMainPage().mainpageAdminHtml+= `
        <h3>Order: ${order.id}</h3>
        <div>Order date: ${new Date(order.order_date).toLocaleDateString()}</div>
        <div>Customer ID: ${order.customer_id}</div>
        <div>Customer name: ${user.name}</div>
        <div>Customer email: ${user.email}</div>
       <hr> `;
        }
        return getMainPage().mainpageAdminHtml;
    }
    else if(condition === 'user') {
        let html = "";
        for(order of completedOrders){
            html+= `
        <h3>Order: ${order.id}</h3>
        <div>Order date: ${new Date(order.order_date).toLocaleDateString()}</div>
        <div>Customer ID: ${order.customer_id}</div>
       <hr> `;
        }
        return html;}
    else{
        return "";
    }
}

async function GetCustomers(){
    getMainPage().mainPageResultHtml = "";
    let response = await fetch("/Customers");
    let users = await response.json();
    for(user of users){
        if(user.id !== getCurrentUser().id && !user.isAdmin && !user.isBanned){
            getMainPage().mainPageResultHtml += `
            <div class="banUserMenu">
            <div class="banUserMenuUsers">
            <div>${user.name}</div>
            <div>${user.email}</div><button onclick="banUser(${user.id}, '${user.email}')">Ban User</button>
</div>
</div>
          
            `;
        }
    }
    return getMainPage().mainPageResultHtml;
}

async function showBannedUsers(){
    model.input.mainpage.mainPageResultBanUsersHtml = "";
    let response = await fetch("/Customers");
    let bannedUsers = await response.json();
    for(user of bannedUsers) {
        if (user.isBanned) {
            model.input.mainpage.mainPageResultBanUsersHtml += `
            <div>${user.name}</div>
            <div>${user.email}</div><button onclick="unBanUser(${user.id}, '${user.email}')">Unban User</button>`
        }
    }
    return model.input.mainpage.mainPageResultBanUsersHtml;
}