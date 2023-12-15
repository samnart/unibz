package src.main;

public class ATM {
    private final Service service;
    private final Hardware hardware;

    public ATM(Service service, Hardware hardware) {
        this.service = service;
        this.hardware = hardware;
    }

    public String login(String password) {
        // Implement login logic using hardware
        return "Login successful";
    }

    public String balance(String password) {
        // Implement balance retrieval logic using service and hardware
        return "Your balance is: " + service.getAccountBalance(getAccountNumber(password));
    }

    public String withdraw(String password, int value) {
        // Implement withdrawal logic using service and hardware
        return "Withdrawal successful";
    }

    public String deposit(String accountNumber) {
        // Implement deposit logic using service and hardware
        return "Deposit successful";
    }

    private String getAccountNumber(String password) {
        return hardware.getAccountNumberFromCard(password);
    }
}
