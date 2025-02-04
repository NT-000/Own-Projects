
async function compareUsers(){
    getLoginPage().loginMessage = "";
    let response = await fetch('/Customers');
    console.log(response);
    let users = await response.json();
    let foundUser = users.find(user => user.email === getLoginPage().username && user.password === getLoginPage().password);
    console.log(foundUser);
        if(foundUser){
            if(foundUser.isBanned){
            getLoginPage().loginMessage = "USER IS BANNED...";
            }
            else{
            model.input.currentUser = foundUser;
            console.log("currentUSer:",model.input.currentUser);
            navigateTo('mainpage');
            }
        }
        else{
            getLoginPage().loginMessage = "Wrong username or password...";
        }
        await fetchData();
    getLoginPage().username = '';
    getLoginPage().password = '';
}
function getLoginPage() {
    return model.input.loginPage;
}
