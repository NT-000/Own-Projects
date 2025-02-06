
async function fetchAllOrders(){
    let response = await fetch(`/Orders/GetAllOrders`);
    getMainPage().adminOrders = await response.json();
    console.log(getMainPage().adminOrders);
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


function getMainPage(){
    return model.input.mainpage;
}
