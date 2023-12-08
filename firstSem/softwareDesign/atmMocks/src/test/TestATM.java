package test;
import main.*;
import org.junit.Test;
import static org.junit.Assert.*;

public class TestATM {
    @Test
    public void testLogin() {
        Service service = new ServiceImpl();
        Hardware hardware = new HardwareImpl();
        ATM atm = new ATM(service, hardware);

        String result = atm.login("1234");
        assertEquals("Logged in. Account Number: 123456789", result);
    }

    @Test
    public void testBalance() {
        Service service = new ServiceImpl();
        Hardware hardware = new HardwareImpl();
        ATM atm = new ATM(service, hardware);

        String result = atm.balance("1234");
        assertEquals("Account Balance: $1000.0", result);
    }

    @Test
    public void testWithdraw() {
        Service service = new ServiceImpl();
        Hardware hardware = new HardwareImpl();
        ATM atm = new ATM(service, hardware);

        String result = atm.withdraw("1234", 500.0);
        assertEquals("Withdrawal successful. New balance: $500.0", result);
    }

    @Test
    public void testDeposit() {
        Service service = new ServiceImpl();
        Hardware hardware = new HardwareImpl();
        ATM atm = new ATM(service, hardware);

        String result = atm.deposit("123456789");
        assertEquals("Deposit successful. New balance: $1500.0", result);
    }
}
