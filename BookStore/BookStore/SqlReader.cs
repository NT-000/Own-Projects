
using Dapper;
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
        List<Book> books = new List<Book>();
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books";
        books = connection.Query<Book>(query).ToList();
        return books;
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

    public async Task<List<Order>> GetOrders()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Orders";
        return connection.Query<Order>(query).ToList();
    }

    public async Task<List<Order>> GetOrderDetails()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM OrderDetails";
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