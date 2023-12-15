package src.main;

public interface Hardware {
    String getAccountNumberFromCard(String password);
    void pay(int value);
    int readEnvelope();
}
