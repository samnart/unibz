import org.junit.jupiter.api.Test;

//import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.*;

public class ShoppingCartTest {
    @Test
    void emptyShoppingCart() {
        ShoppingCart sc = new ShoppingCart();
        assertEquals(0.0, sc.totalValue());
        assertFalse(sc.hasDiscount());
        assertEquals(0.0, sc.moneySaving());
        assertEquals(0, sc.numberOfItems());
    }

    @Test
    void shoppingCartOneItem() {
        ShoppingCart sc = new ShoppingCart();
        ShoppingCartItem item = new ShoppingCartItem(new Product(15.0), 1);
        Discount d = new AbsoluteDiscount(5.0);
        item.addDiscount(d);
        sc.addItem(item);

        assertEquals(10.0, sc.totalValue());
        assertTrue(sc.hasDiscount());
        assertEquals(5.0, sc.moneySaving());
        assertEquals(1, sc.numberOfItems());

    }

    @Test
    void shoppingCartWithAbsoluteDiscount() {
        ShoppingCart sc = new ShoppingCart();
        ShoppingCartItem item = new ShoppingCartItem(new Product(15.0), 1);
        Discount d = new AbsoluteDiscount(5.0);
        item.addDiscount(d);
        sc.addItem(item);

        assertEquals(10.0, sc.totalValue());
        assertTrue(sc.hasDiscount());
        assertEquals(5.0, sc.moneySaving());
        assertEquals(1, sc.numberOfItems());
    }

    @Test
    void shoppingCartWithPercentageDiscount() {
        ShoppingCart sc = new ShoppingCart();
        Product product = new Product(20.0);
        ShoppingCartItem item = new ShoppingCartItem(product, 1);

        Discount percentageDiscount = new PercentageDiscount(30.0, 10.0);
        item.addDiscount(percentageDiscount);

        sc.addItem(item);

        assertEquals(17.0, sc.totalValue());
        assertTrue(sc.hasDiscount());
        assertEquals(3.0, sc.moneySaving());
        assertEquals(1, sc.numberOfItems());
    }

    @Test
    void shoppingCartWithChooseTheBetterDiscount() {
        ShoppingCart sc = new ShoppingCart();
        Product product = new Product(20.0);
        ShoppingCartItem item = new ShoppingCartItem(product, 1);

        Discount absoluteDiscount = new AbsoluteDiscount(5.0);
        Discount percentageDiscount = new PercentageDiscount(30.0, 10.0);

        Discount chooseTheBetterDiscount = new ChooseTheBetter(absoluteDiscount, percentageDiscount);

        item.addDiscount(chooseTheBetterDiscount);

        sc.addItem(item);

        assertEquals(15.0, sc.totalValue());
        assertTrue(sc.hasDiscount());
        assertEquals(5.0, sc.moneySaving());
        assertEquals(1, sc.numberOfItems());
    }
}



