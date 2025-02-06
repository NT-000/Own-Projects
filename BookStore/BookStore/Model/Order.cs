namespace BookStore;

public class Order
{
    public int id {get;set;}
    public DateTime order_date { get; set; } = DateTime.Now;
    public int customer_id {get;set;}
    public bool isPending {get;set;} = true;
    
    
}