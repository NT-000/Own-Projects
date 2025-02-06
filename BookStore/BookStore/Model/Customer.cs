namespace BookStore;

public class Customer
{
    public int id { get; set; }
    public string name {get;set;}
    public string email {get;set;}
    public string password {get;set;}
    public bool isAdmin { get; set;}
    public bool isBanned { get; set;}
    public Customer(string name, string email, string password,bool isAdmin = false, bool isBanned = false)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isBanned = isBanned;
    }

    public Customer()
    {
        
    }
    
}