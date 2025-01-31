
async function compareUsers(){
    model.input.loginPage.loginMessage = "";
    let response = await fetch('/Customers');
    console.log(response);
    let users = await response.json();
    let foundUser = users.find(user => user.email === model.input.loginPage.username && user.password === model.input.loginPage.password);
    console.log(foundUser);
        if(foundUser){
            if(foundUser.isBanned){
            model.input.loginPage.loginMessage = "USER IS BANNED...";
            }
            else{
            model.input.currentUser = foundUser;
            console.log("currentUSer:",model.input.currentUser);
            navigateTo('mainpage');
            }
        }
        else{
            model.input.loginPage.loginMessage = "Wrong username or password...";
        }
        await fetchData();
    model.input.loginPage.username = '';
    model.input.loginPage.password = '';
}

function GetLoginPageMessage(){
    return model.input.loginPage.loginMessage;
}
