async function checkEmail(){
    let response = await fetch("Customers");
    let users = await response.json();
    for(let user of users){
        if(user.email === getRegPage().inputEmail){
            getRegPage().regMessageEmail = "Email already exists";
            updateRegisterView()
            return false;
        }
        else {
           return true;
        }
    }
}
function checkPassword(){
    if(getRegPage().inputPassword !== getRegPage().inputPasswordConfirm){
        getRegPage().regMessagePasswordConfirm = "Passwords do not match";
        return false;
    }
    else{
        getRegPage().regMessagePasswordConfirm = "Passwords do match";
       return true;
    }
}

async function registerUser(){
    getRegPage().regMessage = "";
    let emailCheck = await checkEmail();
    let passwordCheck = checkPassword();
    if(emailCheck && passwordCheck) {
        let newUser = {
            name: getRegPage().inputName,
            email: getRegPage().inputEmail,
            password: getRegPage().inputPassword,
        };
        console.log("User data being sent:", newUser);
        try {
            let response = await fetch("/Customers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                getRegPage().regMessage = "Successfully registered!";
                console.log("added user:", newUser);
                navigateTo('loginpage');
            } else
            {
                getRegPage().regMessage = "Failed to sign up";
            }
            
        } catch (error) {
            console.log("reg error:", error);
            getRegPage().regMessage = "An error occurred. Please try again.";
        }
    }
    getRegPage().inputName = "";
    getRegPage().inputEmail = "";
    getRegPage().inputPassword = "";
    updateLoginPageView();
}
function getRegPage(){
    return model.input.registerPage;
}

