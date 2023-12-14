import org.junit.jupiter.api.Test;

import static org.junit.Assert.*;

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
        ShoppingCartItem item = new ShoppingCartItem(new Product("Dath Vader Funko", 15.0), 1);
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
        ShoppingCartItem item = new ShoppingCartItem(new Product("Dath Vader Funko", 15.0), 1);
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
        ShoppingCartItem item = new ShoppingCartItem()
    }
}
