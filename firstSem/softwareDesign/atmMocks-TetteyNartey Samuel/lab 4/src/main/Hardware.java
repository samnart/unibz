package main;

public interface Hardware {

    String getAccountNumberFromCard(String password);

    void pay(double value);

    double readEnvelope();
}
