package main;

public class Main {
    public static void main(String[] args) {

        Service service = new ServiceImpl();
        Hardware hardware = new HardwareImpl();

        ATM atm = new ATM(service, hardware);

        String loginResult = atm.login("1234");
        System.out.println(loginResult);

        String balanceResult = atm.balance("1234");
        System.out.println(balanceResult);

        String withdrawResult = atm.withdraw("1234", 500.0);
        System.out.println(withdrawResult);

        String depositResult = atm.deposit("123456789");
        System.out.println(depositResult);
    }
}