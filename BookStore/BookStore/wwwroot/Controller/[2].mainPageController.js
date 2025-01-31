async function GetCustomers(){
    model.input.mainpage.mainPageResultHtml = "";
    let response = await fetch("/Customers");
    let users = await response.json();
    for(user of users){
        if(user.id !== getCurrentUser().id && !user.isAdmin && !user.isBanned){
            model.input.mainpage.mainPageResultHtml += `
            <div class="banUserMenu">
            <div class="banUserMenuUsers">
            <div>${user.name}</div>
            <div>${user.email}</div><button onclick="banUser(${user.id}, '${user.email}')">Ban User</button>
</div>
</div>
          
            `;
        }
    }
    return model.input.mainpage.mainPageResultHtml;
}
async function fetchAllOrders(){
    let response = await fetch(`/Orders/GetAllOrders`);
    model.input.mainpage.adminOrders = await response.json();
    console.log(model.input.mainpage.adminOrders);
}

async function showAllOrders(){
    let html = "";
    let response = await fetch(`/Customers`);
    let users = await response.json();
    for(let order of model.input.mainpage.adminOrders){
        let customer = users.find(user => user.id === order.customer_id);
       html+= `
        <h3>Order:${order.id}</h3>
        <div>Email:${customer.email}</div>
        <div>Order date:${new Date(order.order_date).toLocaleDateString()}</div>
        <div>Customer name:${customer.name}</div>
       <hr> `;
    }
    return html;
}
async function fetchCustomers(){

    
}
async function banUser(userid, useremail){
    model.input.mainpage.mainPageErrorHtml = "";
    let response = await fetch(`/Customers/${userid}`, {method: "PUT"});
    if(response.ok){
        model.input.mainpage.mainPageErrorHtml = `User: '${useremail}' is banned...`;
    }
    else{
        model.input.mainpage.mainPageErrorHtml = "Error";
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
        model.input.mainpage.mainPageErrorHtml = `Banned user: ${useremail} are now unbanned`;
    }
    else{
        model.input.mainpage.mainPageErrorHtml = "Error";
    }
    updateViewMainPageAdmin();
}
function getMainPageHtml(){
    return model.input.mainpage.mainPageResultHtml;
}
function getMainPageErrorHtml(){
    return model.input.mainpage.mainPageErrorHtml;
}
function closeOpenMainPage(status) {
    model.input.mainpage[status] = !model.input.mainpage[status];
    updateViewMainPageAdmin();
}
