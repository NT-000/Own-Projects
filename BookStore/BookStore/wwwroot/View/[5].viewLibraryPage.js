
function updateLibraryPageView() {

    getAppDiv().innerHTML =
        `<h1>Library of books</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <input type="number" placeholder="Search for books by year..." oninput="getLibraryPage().inputYear=this.value"> <input type="text" placeholder="Search for books by title..." oninput="model.input.librarypage.inputSearchTitle=this.value">
        <div class="buttons">
  
    <select oninput="getLibraryPage().inputGenre=this.value">
        <option value="">Choose a genre</option>
        <option value="Education">Education</option>
        <option value="Mystery">Mystery</option>
        <option value="Autobiography">Autobiography</option>
        <option value="Self-help">Self-help</option>
        <option value="Biography">Biography</option>
        <option value="Novel">Novel</option>
    </select>
        <button onclick="searchBooksByGenre()">Search genre</button>
        <button onclick="searchBooksByYear()">Search books by year</button>
        <button onclick="searchBooksByTitle()">Search books by title</button>
        </div>
        <div class="innercontainer">
        <div class="books">
        <h2 onclick="closeOpenLibraryPage('isAllBooksOpen')">All Books</h2>
        <div>${getLibraryPage().isAllBooksOpen ? showBooks() : ""}</div>
        <div onclick="closeOpenLibraryPage('isResultsOpen')">RESULTS</div>
        <div>${getLibraryPage().isResultsOpen ? getLibraryPage().resultHtml : ""}</div>
        <div>${getLibraryPage().resultGenre}</div>
        
</div>
</div>
</div>
        `;
    
}