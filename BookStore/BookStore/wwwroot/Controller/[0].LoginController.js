
console.log("LOGIN:Is fetchData defined?", typeof fetchData);
async function compareUsers(){
    let response = await fetch('/Customers');
    console.log(response);
    let users = await response.json();
    for(let user of users){
        if(user.email === model.input.loginPage.username && user.password === model.input.loginPage.password){
            model.input.currentUser = user;
            console.log("currentUSer:",model.input.currentUser);
            
            fetchData()
            navigateTo('mainpage');
            break;
        }
        else{
            model.input.loginPage.loginMessage = "Wrong username or password...";
        }
    }
    model.input.loginPage.username = '';
    model.input.loginPage.password = '';
    updateLoginPageView()
}
