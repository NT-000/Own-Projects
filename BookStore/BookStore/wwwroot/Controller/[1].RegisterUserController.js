async function checkEmail(){
    let response = await fetch("Customers");
    let users = await response.json();
    for(let user of users){
        if(user.email === model.input.registerPage.inputEmail){
            model.input.registerPage.regMessageEmail = "Email already exists";
            updateRegisterView()
            return false;
        }
        else {
           return true;
        }
    }
}
function checkPassword(){
    if(model.input.registerPage.inputPassword !== model.input.registerPage.inputPasswordConfirm){
        model.input.registerPage.regMessagePasswordConfirm = "Passwords do not match";
        return false;
        
    }
    else{
        model.input.registerPage.regMessagePasswordConfirm = "Passwords do match";
       return true;
        
    }
}

async function registerUser(){
    let emailCheck = await checkEmail();
    let passwordCheck = checkPassword();
    if(emailCheck && passwordCheck) {
        let newUser = {
            name: model.input.registerPage.inputName,
            email: model.input.registerPage.inputEmail,
            password: model.input.registerPage.inputPassword,
        };
        console.log("User data being sent:", newUser);
        try {
            let response = await fetch("/Customers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                model.input.registerPage.regMessage = "Successfully registered!";
                console.log("added user:", newUser);
                navigateTo('loginpage');
            } else
            {
                    model.input.registerPage.regMessage = "Failed to sign up";
            }
            
        } catch (error) {
            console.log("reg error:", error);
            model.input.registerPage.regMessage = "An error occurred. Please try again.";
        }
    }
    model.input.registerPage.inputName = "";
    model.input.registerPage.inputEmail = "";
    model.input.registerPage.inputPassword = "";
    updateLoginPageView();
}


