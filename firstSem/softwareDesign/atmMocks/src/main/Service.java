package main;

public interface Service {

    double getAccountBalance(String accountNumber);

    void persistAccountBalance(String accountNumber, double newBalance) throws Exception;
}
