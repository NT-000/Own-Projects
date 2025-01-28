
function updateLoginPageView(){
    getAppDiv().innerHTML = /*HTML*/  `
    <div class="Outercontainer">
    <div class="Innercontainer">
    <div class="Loginplaceholder">
    <form>
    <input type="text" placeholder="Username..." autocomplete="username" oninput="model.input.loginPage.username=this.value">
        <input type="password" placeholder="Password..." autocomplete="password" oninput="model.input.loginPage.password=this.value">
</form>
<button onclick="compareUsers()">Login</button>
<button onclick="navigateTo('registerpage')">Register new user</button>
<div>${model.input.loginPage.loginMessage}</div>
</div>
</div>
</div>
       
   `;
}