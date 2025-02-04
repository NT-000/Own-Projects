const model = {
    app: {
        pages:['loginpage','registerpage','mainpage','orderpage', 'boughtBooksPage','librarypage'],
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
            mainpageHtml: "",
            mainpageAdminHtml: "",
            isBannedOpen: false,
            isUserOpen: false,
            isOrdersOpen: false,
            isCompletedOrdersOpen: false,
            isCompletedOrdersCustomerOpen: false,
            adminOrders:[],
        },//model.input.mainpage
        orderpage:{
            orders:[],
            isOpen: false,
            inputHtml: "",
            errorHtml: "",
        },//model.input.orderpage
        boughtBooksPage:{
            isBoughtBooksOpen: false,
        },//model.input.boughtBooksPage
        librarypage:{
            inputYear: null,
            inputSearchTitle: "",
            inputGenre: "",
            resultGenre: "",
            resultHtml: "",
            inputQuantity: null,
            isAllBooksOpen: false,
            isResultsOpen: false,
            isResultsGenreOpen: false,
        },//model.input.library
        currentUser: {
            bookInventory : [],
        },//model.input.currentUser
    },//model.input
}//model