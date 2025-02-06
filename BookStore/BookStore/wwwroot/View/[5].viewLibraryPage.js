
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

function bookTemplate(results){
    getLibraryPage().resultHtml = "";
    if (results.length > 0) {
        getLibraryPage().resultGenre = `
        
                        <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(book => {
            let author = getMainPage().authors.find(author => author.id === book.author_id);
            return `
                                <tr>
                                    <td>${book.title}</td>
                                    <td>${author.name}</td>
                                    <td>${book.genre}</td>
                                    <td>${book.published_year}</td>
                                    <td><input type="number" placeholder="How many..." oninput="getLibraryPage().inputQuantity=this.value"></td>
                                    <td><button onclick="placeOrder(${book.id})">Order now</button></td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                   
                </table>
        `;}
    else{
        getLibraryPage().resultGenre = `No books found...`;
    }
    updateLibraryPageView()
}

function showBooks() {
    let books = getMainPage().books;
    if (books.length === 0) {
        return '';
    }
    console.log("show-books",books);
    return `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Published Year</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => {
        let author = getMainPage().authors.find(author => author.id === book.author_id);
        console.log("book:",book,"author", author);
        return  `
                    <tr>
                        <td>${book.id}</td>
                         <td>${author.name}</td>
                        <td>${book.title}</td>
                        <td>${book.genre}</td>
                        <td>${book.published_year}</td>
                        <td><input type="number" placeholder="How many..." oninput="getLibraryPage().inputQuantity=this.value"></td>
                        <td><button onclick="placeOrder(${book.id})">Order now</button></td>
                    </tr>
                `;
    }).join('')}
            </tbody>
        </table>
    `;
}