package main;

public class HardwareImpl implements Hardware{
    @Override
    public String getAccountNumberFromCard(String password) {
        return "123456789";
    }

    @Override
    public void pay(double value) {
        System.out.println("Paid: $" + value);
    }

    @Override
    public double readEnvelope() {
        return 500.0;
    }
}
