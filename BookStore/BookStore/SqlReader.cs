
using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace BookStore;

public class SqlReader
{
    private string? _connectionString;

    public SqlReader(string? connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<List<Book>> GetBooks()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books";
        return connection.Query<Book>(query).ToList();
    }
    public async Task<List<Book>> GetBooksAfter(int year)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books WHERE published_year = @Year ORDER BY published_year ";
        return connection.Query<Book>(query, new {Year = year}).ToList();
    }
    
    public async Task<List<Book>> GetBooksByName(string title)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books WHERE title LIKE '%' + @Title + '%'";
        return connection.Query<Book>(query, new {Title = title}).ToList();
    }
    public async Task<List<Book>> GetBookByGenre(string Genre)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books WHERE genre = @Genre";
        return connection.Query<Book>(query, new {Genre}).ToList();
    }

    public async Task<List<Order>> GetAllOrdersAdmin()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Orders WHERE isPending = 1";
        return connection.Query<Order>(query).ToList();
    }

    public async Task<List<Book>> GetPurchasedBooksByCustomer(int CustomerId)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = @"SELECT b. * FROM Books b
            INNER JOIN CustomerBooks cb ON b.id = cb.book_id
            WHERE cb.customer_id = @CustomerId";
        return connection.Query<Book>(query, new {CustomerId}).ToList();
    }

    public async Task<int> AddPurchasedBook(int customerId, int bookId)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "INSERT INTO CustomerBooks (book_id, customer_id) VALUES (@CustomerId,@BookId)";
        return await connection.ExecuteAsync(query, new {CustomerId = customerId, BookId = bookId});
    }

    public async Task<int> newOrder(DateTime order_date, int customer_id)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "INSERT INTO Orders (order_date, customer_id) VALUES (@order_date, @customer_id)  SELECT SCOPE_IDENTITY();";
        return await connection.ExecuteScalarAsync<int>(query, new {order_date,customer_id});
    }

    public async Task<int> newOrderItem(int order_id, int book_id, int quantity)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "INSERT INTO OrderItems (order_id, book_id, quantity) VALUES (@order_id, @book_id, @quantity)";
        return await connection.ExecuteAsync(query, new {order_id, book_id, quantity});
    }

    public async Task<List<Author>> GetAuthors()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Authors";
        return connection.Query<Author>(query).ToList();
    }

    public async Task<List<Customer>> GetCustomers()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Customers";
        return connection.Query<Customer>(query).ToList();
    }

    public async Task<int> newCustomer(string name, string email, string password)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "INSERT INTO Customers (name, email, password) VALUES (@Name, @Email,@Password)";
        return await connection.ExecuteAsync(query, new { Name = name, Email = email, Password = password });
    }

    public async Task<int> BanUser(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "UPDATE Customers SET isBanned = 1 where id = @Id";
        return await connection.ExecuteAsync(query, new { Id = id });
    }
    public async Task<int> UnBanUser(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "UPDATE Customers SET isBanned = 0 where id = @Id";
        return await connection.ExecuteAsync(query, new { Id = id });
    }

    public async Task<List<Order>> GetOrders()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Orders";
        return connection.Query<Order>(query).ToList();
    }
    
    public async Task<List<OrderItem>> GetOrderItems()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM OrderItems";
        return connection.Query<OrderItem>(query).ToList();
    }
}