import java.util.ArrayList;
import java.util.List;

public class ShoppingCartItem {
    private Product product;
    private int amount;
    private List<Discount> discounts = new ArrayList<>();

    public ShoppingCartItem(Product product, int amount) {
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
        discounts.add(d);
    }

    public double getFinalPrice() {
        double finalPrice = product.getFinalPrice();
        double maxDiscount = 0.0;

        for (Discount discount : discounts) {
            double discountValue = discount.discountValue(this);
            maxDiscount = Math.max(maxDiscount, discountValue);
        }

        finalPrice -= maxDiscount;
        return Math.max(0, finalPrice); // Ensure final price is non-negative
    }

    public List<Discount> getDiscounts() {
        return discounts;
    }

}


