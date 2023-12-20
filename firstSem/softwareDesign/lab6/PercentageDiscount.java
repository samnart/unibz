public class PercentageDiscount implements Discount{
    private double percentage;
    private double limit;

    public PercentageDiscount(double percentage, double limit) {
        this.percentage = percentage;
        this.limit = limit;
    }

    @Override
    public double discountValue(ShoppingCartItem item) {
        double discount = item.getFinalPrice() * (percentage / 100.0);
        return Math.min(discount, limit);
    }
}


