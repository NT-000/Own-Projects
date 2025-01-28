
function updateLibraryPageView() {

    getAppDiv().innerHTML =
        `<h1>Library of books</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <input type="number" placeholder="Search for books by year..." oninput="model.input.librarypage.inputYear=this.value"> <input type="text" placeholder="Search for books by title..." oninput="model.input.librarypage.inputSearchTitle=this.value">
        <button onclick="searchBooksByYear()">Search books by year</button> <button onclick="searchBooksByTitle()">Search books by title</button>
        <div class="innercontainer">
        <div class="books">
        <div>${showBooks()}</div>
        <div>RESULTS</div>
        <div>${model.input.librarypage.resultHtml}</div>
</div>
</div>
</div>
        `;
    
}