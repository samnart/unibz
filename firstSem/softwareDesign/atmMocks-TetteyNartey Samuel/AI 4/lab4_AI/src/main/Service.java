package src.main;

public interface Service {
    int getAccountBalance(String accountNumber);
    void persistAccountBalance(String accountNumber, int newBalance) throws Exception;
}
