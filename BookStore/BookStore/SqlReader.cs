
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
        var query = "SELECT * FROM Books WHERE published_year = @year ORDER BY published_year ";
        return connection.Query<Book>(query, new {year}).ToList();
    }
    
    public async Task<List<Book>> GetBooksByName(string title)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books WHERE title LIKE '%' + @title + '%'";
        return connection.Query<Book>(query, new {title}).ToList();
    }
    public async Task<List<Book>> GetBookByGenre(string genre)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Books WHERE genre = @genre";
        return connection.Query<Book>(query, new {genre}).ToList();
    }

    public async Task<List<Order>> GetAllOrdersAdmin()
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Orders WHERE isPending = 1";
        return connection.Query<Order>(query).ToList();
    }

    public async Task DeleteOrder(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "DELETE FROM Orders WHERE id = @id";
        await connection.ExecuteAsync("DELETE FROM OrderItems WHERE order_id = @id", new {id});
        await connection.ExecuteAsync(query, new {id});
    }

    public async Task<List<Book>> GetPurchasedBooksByCustomer(int customerId)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = @"SELECT b. * FROM Books b
            INNER JOIN CustomerBooks cb ON b.id = cb.book_id
            WHERE cb.customer_id = @customerId";
        return connection.Query<Book>(query, new {customerId}).ToList();
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

    public async Task<int> addNewBook(int book_id, int customer_id)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "INSERT INTO CustomerBooks (book_id, customer_id) OUTPUT INSERTED.id VALUES (@book_id, @customer_id)";
        return await connection.ExecuteScalarAsync<int>(query, new { book_id, customer_id });
    }

    public async Task<int> updateOrder(int id)
    {
        Console.WriteLine($"Updating order with ID(updateOrder): {id}");
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "UPDATE Orders SET isPending = 0 WHERE id = @id";
        return await connection.ExecuteAsync(query, new {id});
    }

    public async Task<List<Order>> GetAllIsPendingFalse()
    {
        var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        var query = "SELECT * FROM Orders WHERE isPending = 0";
        return connection.Query<Order>(query).ToList();
    }

    public async Task<List<Order>> GetCompletedOrdersCustomer(int id, bool isAdmin)
    {
        Console.WriteLine($"Sent ID(GetCompletedOrdersCustomer): {id}");
        using var connection = new SqlConnection(_connectionString);
        string query;
        if (isAdmin)
        {
            query = "SELECT * FROM Orders WHERE isPending = 0";
        }
        else
        {
            query = "SELECT * FROM Orders WHERE customer_id = @id AND isPending = 0";
        }
        return connection.Query<Order>(query, new {id}).ToList();
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
        var query = "INSERT INTO Customers (name, email, password) VALUES (@name, @email,@password)";
        return await connection.ExecuteAsync(query, new {name, email, password });
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
        var query = "SELECT * FROM Orders WHERE isPending = 1";
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