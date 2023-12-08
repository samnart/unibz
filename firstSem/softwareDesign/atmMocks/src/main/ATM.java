package main;

public class ATM {
    private Service service;
    private Hardware hardware;

    public ATM(Service service, Hardware hardware) {
        this.service = service;
        this.hardware = hardware;
    }

    public String login(String password) {
        String accountNumber = hardware.getAccountNumberFromCard(password);
        return "Logged in. Account Number: " + accountNumber;
    }

    public String balance(String password) {
        String accountNumber = hardware.getAccountNumberFromCard(password);
        double accountBalance = service.getAccountBalance(accountNumber);
        return "Account Balance: $" + accountBalance;
    }

    public String withdraw(String password, double value) {
        String accountNumber = hardware.getAccountNumberFromCard(password);
        double accountBalance = service.getAccountBalance(accountNumber);

        if (accountBalance >= value) {
            hardware.pay(value);
            double newBalance = accountBalance - value;
            try {
                service.persistAccountBalance(accountNumber, newBalance);
            } catch (Exception e) {
                return "Error updating balance: " + e.getMessage();
            }
            return "Withdrawal successful. New balance: $" + newBalance;
        } else {
            return "Insufficient funds.";
        }
    }

    public String deposit(String accountNumber) {
        double envelopeValue = hardware.readEnvelope();
        double accountBalance = service.getAccountBalance(accountNumber);
        double newBalance = accountBalance + envelopeValue;
        try {
            service.persistAccountBalance(accountNumber, newBalance);
        } catch (Exception e) {
            return "Error updating balance: " + e.getMessage();
        }
        return "Deposit successful. New balance: $" + newBalance;
    }
}
