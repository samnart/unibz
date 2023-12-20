public class AbsoluteDiscount implements Discount {
    private double value;

    public AbsoluteDiscount(double value) {

        this.value = value;
    }

    @Override
    public double discountValue(ShoppingCartItem item) {
        double discount = Math.min(value, item.getProduct().getFinalPrice());
        return discount;
    }
}


