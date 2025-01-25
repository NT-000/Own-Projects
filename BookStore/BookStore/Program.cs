using BookStore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<SqlReader>(sp => new SqlReader(
    builder.Configuration.GetConnectionString("SqlConnection")
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
app.MapGet("/Orders", async ([FromServices] SqlReader sqlReader) =>
{
    var orders = await sqlReader.GetOrders();
    return Results.Json(orders);
});
app.MapGet("/OrderItem", async ([FromServices] SqlReader sqlReader) =>
{
    var orderItems = await sqlReader.GetOrderItems();
    return Results.Json(orderItems);
});
app.Run();
