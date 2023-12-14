import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<ShoppingCartItem> items = new ArrayList<>();
    public double totalValue() {
        double total = 0.0;
        for (ShoppingCartItem item : items) {
            total += item.getFinalPrice();
        }
        return  total;
    }

    public Product getProduct() {}

    public boolean hasDiscount() {
        return item == null? false : item.getDiscount() > 0.0;
    }

    public double moneySaving() {
        return item == null? 0: item.getDiscount();
    }

    public int numberOfItems() {
        return item == null ? 0 : item.getAmount();
    }

    public void addItem(ShoppingCartItem item){
        this.item = item;
    }
}