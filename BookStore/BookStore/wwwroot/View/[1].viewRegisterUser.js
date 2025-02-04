
function updateRegisterView(){

    getAppDiv().innerHTML = `
    <h1>Register User</h1>
    <div class="outercointainerRegister">
    <input type ="text" placeholder="Name..." oninput="getRegPage().inputName=this.value">
    <input type ="text" placeholder="Email.." oninput="getRegPage().inputEmail=this.value">
    <div>${getRegPage().regMessageEmail}</div>
    <form>
    <input type ="new-password" placeholder="Input password..." oninput="getRegPage().inputPassword=this.value">
    <input type ="new-password" placeholder="Confirm password.." oninput="getRegPage().inputPasswordConfirm=this.value">
    <div>${getRegPage().regMessagePasswordConfirm}</div>
    </form>
    <button onclick ="registerUser()">Register new user</button>
    <div>${getRegPage().regMessage}</div>
    </div>
    `;
}