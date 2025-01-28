function showBooks() {
    let books = model.input.mainpage.books;
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
                    <th>Rent</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => {
        let author = model.input.mainpage.authors.find(author => author.id === book.author_id);
        console.log("book:",book,"author", author);
        return  `
                    <tr>
                        <td>${book.id}</td>
                         <td>${author.name}</td>
                        <td>${book.title}</td>
                        <td>${book.genre}</td>
                        <td>${book.published_year}</td>
                        <td><button>Rent now</button></td>
                    </tr>
                `;
    }).join('')}
            </tbody>
        </table>
    `;
}

async function searchBooksByYear() {
    let response = await fetch(`Books/Search/${getInputYear()}`)
    let results = await response.json();
    console.log("searchBookYear:",results);
    bookTemplate(results);
    }

async function searchBooksByTitle() {
    let response = await fetch(`Books/SearchName/${getInputSearchTitle()}`)
    let results = await response.json();
    console.log("searchBookByTitle:",results);
    bookTemplate(results);

}

function bookTemplate(results){
    model.input.librarypage.resultHtml = "";
    if (results.length > 0) {
        model.input.librarypage.resultHtml = `
        
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
            return `
                                <tr>
                                    <td>${book.title}</td>
                                    <td>${book.author}</td>
                                    <td>${book.genre}</td>
                                    <td>${book.published_year}</td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                   
                </table>
        `;}
    else{
        model.input.librarypage.resultHtml = `No books found...`;
    }
    updateLibraryPageView()
}

function getInputYear(){
    return model.input.librarypage.inputYear;
}
function getInputSearchTitle(){
    return model.input.librarypage.inputSearchTitle;
}