function updateOrdersView() {
    
    getAppDiv().innerHTML =   `
    <h1>${getCurrentUser().name}'s Ordered Books</h1>
    ${createNavButtons()}
    <div></div>
    <button onclick="findOrder()">View Books</button>
    <div>${showOrdersCurrentUser()}</div>
  
    `;
}
