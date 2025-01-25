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
                    </tr>
                `;
    }).join('')}
            </tbody>
        </table>
    `;
}
function goToLibraryPage() {
    navigateTo('orderpage');
}