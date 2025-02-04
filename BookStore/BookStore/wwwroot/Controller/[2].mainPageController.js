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
async function fetchAllOrders(){
    let response = await fetch(`/Orders/GetAllOrders`);
    getMainPage().adminOrders = await response.json();
    console.log(getMainPage().adminOrders);
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
async function updateOrder(orderId){
    console.log("Updating order with ID:", orderId);
    let response = await fetch(`/Orders/${orderId}/StatusOrder`, {
        method: 'PUT',
    });
        if (response.ok) {
            console.log("Ordre oppdatert til false:");
            await fetchCompletedOrders(orderId);
        }
        else {
            console.log("Failed to update order status");
        }
            await updateViewMainPageAdmin();
}

async function banUser(userid, useremail){
    getMainPage().mainPageErrorHtml = "";
    let response = await fetch(`/Customers/${userid}`, {method: "PUT"});
    if(response.ok){
        getMainPage().mainPageErrorHtml = `User: '${useremail}' is banned...`;
    }
    else{
        getMainPage().mainPageErrorHtml = "Error";
    }
    updateViewMainPageAdmin();
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
async function unBanUser(userid, useremail){
    console.log(`Unbanning user with ID(unBanUser): ${userid}, email: ${useremail}`);
    let response = await fetch(`/Customers/Unban/${userid}`, {method: "PUT"});
    if(response.ok){
        getMainPage().mainPageErrorHtml = `Banned user: ${useremail} are now unbanned`;
    }
    else{
        getMainPage().mainPageErrorHtml = "Error";
    }
    updateViewMainPageAdmin();
}

function closeOpenMainPage(status) {
    console.log("Current status before toggle:", getMainPage()[status]);
    getMainPage()[status] = !getMainPage()[status];
    console.log("New status after toggle:", getMainPage()[status]);
    if(getCurrentUser().isAdmin) {
        updateViewMainPageAdmin();
    }
    else{
        updateViewMainPageCustomer()
    }
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
        <div>Customer name: ${user.email}</div>
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
function getMainPage(){
    return model.input.mainpage;
}
