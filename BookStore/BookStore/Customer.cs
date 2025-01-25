namespace BookStore;

public class Customer
{
    public int id {get;private set;}
    public string name {get;private set;}
    public string email {get;private set;}
    public string password {get;private set;}
    
    public List<Book> book_inventory {get;private set;}

    public Customer(string name, string email, string password)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        book_inventory = new List<Book>();
    }

    public Customer()
    {
        
    }
}