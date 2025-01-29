
function updateRegisterView(){

    getAppDiv().innerHTML = `
    <h1>Register User</h1>
    <div class="outercointainerRegister">
    <input type ="text" placeholder="Name..." oninput="model.input.registerPage.inputName=this.value">
    <input type ="text" placeholder="Email.." oninput="model.input.registerPage.inputEmail=this.value">
    <div>${model.input.registerPage.regMessageEmail}</div>
    <form>
    <input type ="new-password" placeholder="Input password..." oninput="model.input.registerPage.inputPassword=this.value">
    <input type ="new-password" placeholder="Confirm password.." oninput="model.input.registerPage.inputPasswordConfirm=this.value">
    <div>${model.input.registerPage.regMessagePasswordConfirm}</div>
    </form>
    <button onclick ="registerUser()">Register new user</button>
    <div>${model.input.registerPage.regMessage}</div>
    </div>
    `
}