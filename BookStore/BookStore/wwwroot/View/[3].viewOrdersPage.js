function updateOrdersView() {
    let ordersDiv = showOrdersCurrentUser();
    getAppDiv().innerHTML =   `
    <h1>${getCurrentUser().name}'s Ordered Books</h1>
    ${createNavButtons()}
    <div></div>
    <button onclick="findOrder()">View Orders</button>
    <div>${ordersDiv}</div>
  
    `;
}
