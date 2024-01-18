package src.main;

public class CurrentUser {

    static ThreadLocal<String> user = new ThreadLocal<String>();

    public static void setUser(String userName) {
        user.set(userName);
    }

    public static String getUser() {
        return user.get();
    }
}
