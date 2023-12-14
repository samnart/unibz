public class AbsoluteDiscount implements Discount {
    private double value;

    public AbsoluteDiscount(double value) {
        this.value = value;
    }

//    @override
    public double discountValue(ShoppingCartItem item) {
        int value = 1;
        return item.getAmount() * value;

        if (value > item.getAmount().getFinalPrice)
    }
}
