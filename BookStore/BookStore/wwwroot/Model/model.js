const model = {
    app: {
        pages:['loginpage','registerpage','mainpage','orderpage', 'rentpage'],
        currentPage: "loginpage",
        appDiv: document.getElementById("app"),
    },//model.app
    input: {
        loginPage:{
          username: '',
          password: '',
          loginMessage: '',  
        },//model.input.loginPage
        registerPage:{
            
        },//model.input.registerPage
        mainpage:{
            books: [],
            authors: [],
        },//model.input.mainpage
        orderpage:{
            orders:[],
        },//model.input.orderpage
        currentUser: {},//model.input.currentUser
    },//model.input
}//model