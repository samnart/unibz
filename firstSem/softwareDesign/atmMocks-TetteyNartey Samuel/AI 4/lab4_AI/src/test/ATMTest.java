package src.test;

import org.junit.Test;
import src.main.ATM;
import src.main.Hardware;
import src.main.Service;

import static org.mockito.Mockito.*;

public class ATMTest {

    @Test
    public void testLogin() {
        // Create a mock Hardware object
        Hardware mockHardware = mock(Hardware.class);

        // Set up the expected behavior for getAccountNumberFromCard
        when(mockHardware.getAccountNumberFromCard("correctPassword")).thenReturn("123456");

        // Create ATM instance with the mock Hardware
        ATM atm = new ATM(null, mockHardware);

        // Perform the login
        String result = atm.login("correctPassword");

        // Verify that the correct method was called on the mock object
        verify(mockHardware).getAccountNumberFromCard("correctPassword");

        // Assert the expected result
        assert result.equals("Login successful");
    }

    @Test
    public void testBalance() {
        // Create mock Service and Hardware objects
        Service mockService = mock(Service.class);
        Hardware mockHardware = mock(Hardware.class);

        // Set up the expected behavior for getAccountBalance and getAccountNumberFromCard
        when(mockService.getAccountBalance("123456")).thenReturn(1000);
        when(mockHardware.getAccountNumberFromCard("correctPassword")).thenReturn("123456");

        // Create ATM instance with the mock Service and Hardware
        ATM atm = new ATM(mockService, mockHardware);

        // Perform the balance check
        String result = atm.balance("correctPassword");

        // Verify that the correct methods were called on the mock objects
        verify(mockService).getAccountBalance("123456");
        verify(mockHardware).getAccountNumberFromCard("correctPassword");

        // Assert the expected result
        assert result.equals("Your balance is: 1000");
    }

    @Test
    public void testWithdraw() {
        // Create mock Service and Hardware objects
        Service mockService = mock(Service.class);
        Hardware mockHardware = mock(Hardware.class);

        // Set up the expected behavior for getAccountBalance, getAccountNumberFromCard, and pay
        when(mockService.getAccountBalance("123456")).thenReturn(1000);
        when(mockHardware.getAccountNumberFromCard("correctPassword")).thenReturn("123456");

        // Create ATM instance with the mock Service and Hardware
        ATM atm = new ATM(mockService, mockHardware);

        // Perform the withdrawal
        String result = atm.withdraw("correctPassword", 500);

        // Verify that the correct methods were called on the mock objects
        verify(mockService).getAccountBalance("123456");
        verify(mockHardware).getAccountNumberFromCard("correctPassword");
        verify(mockHardware).pay(500);

        // Assert the expected result
        assert result.equals("Withdrawal successful");
    }

    @Test
    public void testDeposit() {
        // Create mock Service and Hardware objects
        Service mockService = mock(Service.class);
        Hardware mockHardware = mock(Hardware.class);

        // Set up the expected behavior for getAccountNumberFromCard and readEnvelope
        when(mockHardware.getAccountNumberFromCard("correctPassword")).thenReturn("123456");
        when(mockHardware.readEnvelope()).thenReturn(200);

        // Create ATM instance with the mock Service and Hardware
        ATM atm = new ATM(mockService, mockHardware);

        // Perform the deposit
        String result = atm.deposit("123456");

        // Verify that the correct methods were called on the mock objects
        verify(mockHardware).getAccountNumberFromCard("correctPassword");
        verify(mockHardware).readEnvelope();

        // Assert the expected result
        assert result.equals("Deposit successful");
    }
}

