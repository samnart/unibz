public class ShoppingCartItem {
    private Product product;
    private int amount;

    public ShoppingCartItem(Product product, int amount) {
        super();
        this.product = product;
        this.amount = amount;
    }

    public Product getProduct() {
        return product;
    }

    public int getAmount() {
        return amount;
    }

    public void addDiscount(Discount d) {
    }

    public void getDiscount() {
    }

//    public
}
