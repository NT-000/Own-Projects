function updateOrdersView() {

    document.getElementById('app').innerHTML =
        `<h1>Library of books</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <div class="innercontainer">
        <div class="books">
        <div>${showBooks()}</div>
</div>
</div>
</div>
        `;
}
