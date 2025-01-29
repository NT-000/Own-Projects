
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
    getAppDiv().innerHTML =
        `<h1>Welcome Admin, ${model.input.currentUser.name}</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
       <h3>Banned Users</h3>
       <h4>${model.input.mainpage.mainPageErrorHtml}</h4>
       ${bannedUsers}
       <h3>Users</h3>
       ${customerHtml}
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