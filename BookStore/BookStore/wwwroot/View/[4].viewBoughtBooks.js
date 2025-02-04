
async function updateBoughtBooksView(){
    let purchasedBooks = await fetchPurchasedBooks();
    getAppDiv().innerHTML =
        `<h1>Bought Books</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <div class="innercontainer">
        <div class="books">
        <div></div>
        <h2 onclick="isOpenClosedBoughtBooksPage()">Bought books<h2>
        <div>${getBoughtBooksPage().isBoughtBooksOpen ? purchasedBooks : ""}</div>
</div>
</div>
</div>
        `;
}