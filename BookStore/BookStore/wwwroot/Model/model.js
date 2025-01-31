const model = {
    app: {
        pages:['loginpage','registerpage','mainpage','orderpage', 'rentpage','librarypage'],
        currentPage: "loginpage",
    },//model.app
    input: {
        loginPage:{
          username: '',
          password: '',
          loginMessage: '',  
        },//model.input.loginPage
        registerPage:{
            inputName:"",
            inputEmail:"",
            inputPassword:"",
            inputPasswordConfirm:"",
            regMessageEmail: "",
            regMessagePasswordConfirm:"",
            regMessage:"",
            isEmail:false,
            isPassword:false,
        },//model.input.registerPage
        mainpage:{
            books: [],
            authors: [],
            mainPageResultHtml: "",
            mainPageResultBanUsersHtml: "",
            mainPageErrorHtml: "",
            isBannedOpen: false,
            isUserOpen: false,
            isOrdersOpen: false,
            adminOrders:[],
        },//model.input.mainpage
        orderpage:{
            orders:[],
            isOpen: false,
            inputHtml: "",
        },//model.input.orderpage
        rentpage:{
            
        },//model.input.rentpage
        librarypage:{
            inputYear: null,
            inputSearchTitle: "",
            resultHtml: "",
            inputQuantity: null,
            isAllBooksOpen: false,
            isResultsOpen: false,
        },//model.input.library
        currentUser: {
            bookInventory : [],
        },//model.input.currentUser
    },//model.input
}//model