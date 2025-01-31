
function updateRentedBooksView(){
    getAppDiv().innerHTML =
        `<h1>RENTED BOOKS</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>
        <div class="container">
        <button onclick=""></button>
        <div class="innercontainer">
        <div class="books">
        <div></div>
        <div>RESULTS</div>
        <div></div>
</div>
</div>
</div>
        `;
}