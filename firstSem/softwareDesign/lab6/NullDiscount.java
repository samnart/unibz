public class NullDiscount implements Discount {
    @Override
    public double discountValue(ShoppingCartItem item) {
        return 0.0;
    }
}
