public class ChooseTheBetter implements Discount{
    private Discount discount1;
    private Discount discount2;

    public ChooseTheBetter(Discount discount1, Discount discount2) {
        this.discount1 = discount1;
        this.discount2 = discount2;
    }

    @Override
    public double discountValue(ShoppingCartItem item) {
//        // Choose the better discount among discount1 and discount2
//        if (discount1 instanceof ChooseTheBetter || discount2 instanceof ChooseTheBetter) {
//            return 0.0;
//        }
        double value1 = discount1.discountValue(item);
        double value2 = discount2.discountValue(item);
        return Math.max(value1, value2);
    }

}
