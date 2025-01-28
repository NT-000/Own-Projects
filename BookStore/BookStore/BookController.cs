using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace BookStore;

public class BookController : Controller
{
    private SqlReader _sqlReader;
    
    public BookController(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlConnection");
        _sqlReader = new SqlReader(connectionString);
    }
    
    // public async Task<List<Book>> GetBooksAfter2023(string year)
    // {
    //     
    //     var books = await _reader.
    //     var query = "SELECT * FROM Books WHERE published_year > 2023 ORDER BY published_year ";
    //     return connection.Query<Book>(query).ToList();
    // }

}