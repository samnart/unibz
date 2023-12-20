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

    public boolean hasDiscount() {
        for (ShoppingCartItem item : items) {
            if (!item.getDiscounts().isEmpty()){
                return true;
            }
        }
        return false;
    }

    public double moneySaving() {
        double savings = 0.0;
        for (ShoppingCartItem item : items) {
            for (Discount discount : item.getDiscounts()) {
                savings += discount.discountValue(item);
            }
        }
        return savings;
    }

    public int numberOfItems() {
        int count = 0;
        for (ShoppingCartItem item : items) {
            count += item.getAmount();
        }
        return count;
    }

    public void addItem(ShoppingCartItem item){
        items.add(item);
    }

    public void addDiscountToAllItems(Discount discount) {
        for (ShoppingCartItem item : items) {
            item.addDiscount(discount);
        }
    }
}

