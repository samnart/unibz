package main;

public class ServiceImpl implements Service {

    @Override
    public double getAccountBalance(String accountNumber) {
        return 1000.0;
    }

    @Override
    public void persistAccountBalance(String accountNumber, double newBalance) throws Exception {
        if (newBalance < 0) {
            throw new Exception("Invalid balance: " + newBalance);
        }
    }
}
