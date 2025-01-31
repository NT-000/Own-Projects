
function updateLibraryPageView() {

    getAppDiv().innerHTML =
        `<h1>Library of books</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <input type="number" placeholder="Search for books by year..." oninput="model.input.librarypage.inputYear=this.value"> <input type="text" placeholder="Search for books by title..." oninput="model.input.librarypage.inputSearchTitle=this.value">
        <div class="buttons">
        <button onclick="searchBooksByYear()">Search books by year</button>
        <button onclick="searchBooksByTitle()">Search books by title</button>
        </div>
        <div class="innercontainer">
        <div class="books">
        <h2 onclick="closeOpenLibraryPage('isAllBooksOpen')">All Books</h2>
        <div>${model.input.librarypage.isAllBooksOpen ? showBooks() : ""}</div>
        <div onclick="closeOpenLibraryPage('isResultsOpen')">RESULTS</div>
        <div>${model.input.librarypage.isResultsOpen ? model.input.librarypage.resultHtml : ""}</div>
        
</div>
</div>
</div>
        `;
    
}