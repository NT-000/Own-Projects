using BookStore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<SqlReader>(sp => new SqlReader(builder.Configuration.GetConnectionString("SqlConnection")
));
var app = builder.Build();

app.UseRouting();
app.UseStaticFiles();
app.MapGet("/Books", async ([FromServices] SqlReader sqlReader) =>
{
    var books = await sqlReader.GetBooks();
    return Results.Json(books);
});

app.MapGet("/Authors", async ([FromServices] SqlReader sqlReader) =>
{
    var authors = await sqlReader.GetAuthors();
    return Results.Json(authors);
});
app.MapGet("/Customers", async ([FromServices] SqlReader sqlReader) =>
{
    var customers = await sqlReader.GetCustomers();
    return Results.Json(customers);
});
app.MapPost("/Customers", async ([FromServices] SqlReader sqlReader, [FromBody] Customer newCustomer) =>
{
    if (string.IsNullOrWhiteSpace(newCustomer.name) ||
        string.IsNullOrWhiteSpace(newCustomer.email) ||
        string.IsNullOrWhiteSpace(newCustomer.password))
    {
        return Results.BadRequest("Invalid input data");
    }

    var existingCustomer = await sqlReader.GetCustomers();
    if (existingCustomer.Any(customer => customer.email == newCustomer.email))
    {
        return Results.BadRequest("Customer with email ${newCustomer.email} already exists");
    }
    var rows = await sqlReader.newCustomer(newCustomer.name, newCustomer.email,newCustomer.password);
    if (rows > 0)
    {
        return Results.Ok();
    }
    return Results.StatusCode(500);
});
app.MapPut("/Customers/{Id}", async ([FromServices] SqlReader sqlReader, int Id) =>
{
    var result = await sqlReader.BanUser(Id);
    if (result > 0)
    {
        return Results.Ok();
    }
    return Results.StatusCode(500);
});
app.MapPut("/Customers/Unban/{Id}", async ([FromServices] SqlReader sqlReader, int Id) =>{
    
        var result = await sqlReader.UnBanUser(Id);
        if (result > 0)
        {
            return Results.Ok();
        }

        return Results.StatusCode(500);
        
});
// app.MapGet("/Customers/{customerId}/CustomerBooks", async ([FromServices] SqlReader sqlReader, int customerId) =>
// {
//     var purchasedBooks = await sqlReader.GetPurchasedBooksByCustomer(customerId);
//     return Results.Ok(purchasedBooks);
// });
// app.MapPost("Customers/{customerId}/PurchaseBook/{bookId}",
//     async ([FromServices] SqlReader sqlReader, int customerId, int bookId) =>
//     {
//         var result = await sqlReader.AddPurchasedBook(customerId, bookId);
//         if (result > 0)
//         {
//             return Results.Ok();
//         }
//         return Results.StatusCode(500);
//     });
app.MapPost("/Orders", async ([FromServices] SqlReader sqlReader, [FromBody] Order newOrder) =>
{
    Console.WriteLine($"Received order: Date={newOrder.order_date}, CustomerId={newOrder.customer_id}");
    try
    {
        var orderId = await sqlReader.newOrder(newOrder.order_date, newOrder.customer_id);
        if (orderId > 0)
        {
            return Results.Json(new Order
            {
                id = orderId,
                order_date = DateTime.Now,
                customer_id = newOrder.customer_id,
            });
        }

        return Results.StatusCode(500);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in POST /Orders: {ex.Message}");
        return Results.StatusCode(500);
    }
});
app.MapGet("/Books/Search/{year}", async ([FromServices] SqlReader sqlReader, int year) =>
{
    var books = await sqlReader.GetBooksAfter(year);
    return Results.Json(books);
});
app.MapGet("/Books/SearchName/{title}", async ([FromServices] SqlReader sqlReader, string title) =>
{
    var bookTitles = await sqlReader.GetBooksByName(title);
    return Results.Json(bookTitles);
});
app.MapGet("/Books/SearchGenre/{genre}", async ([FromServices] SqlReader sqlReader, string genre) =>
{
    var books = await sqlReader.GetBookByGenre(genre);
    return Results.Json(books);
});
    
app.MapGet("/Orders", async ([FromServices] SqlReader sqlReader) =>
{
    var orders = await sqlReader.GetOrders();
    return Results.Json(orders);
});
app.MapGet("/Orders/GetAllOrders", async ([FromServices] SqlReader sqlReader) =>
{
    var orders = await sqlReader.GetAllOrdersAdmin();
    return Results.Json(orders);
});
app.MapGet("/OrderItems", async ([FromServices] SqlReader sqlReader) =>
{
    var orderItems = await sqlReader.GetOrderItems();
    return Results.Json(orderItems);
});
app.MapPost("/OrderItems", async ([FromServices] SqlReader sqlReader, [FromBody] OrderItem newOrderItem) =>
{
var result = await sqlReader.newOrderItem(newOrderItem.order_id, newOrderItem.book_id, newOrderItem.quantity);
if (result > 0)
{
    Console.WriteLine($"OrderItem: order_id={newOrderItem.order_id}, book_id={newOrderItem.book_id}, quantity={newOrderItem.quantity}"); 
    return Results.Json( new OrderItem
    {
        order_id = newOrderItem.order_id,
        book_id = newOrderItem.book_id,
        quantity = newOrderItem.quantity,
    });

}
return Results.StatusCode(500);
});
app.Run();
