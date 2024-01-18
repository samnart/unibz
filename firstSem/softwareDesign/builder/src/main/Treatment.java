package src.main;

public abstract class Treatment {
    private String name;

    public Treatment() {
        this.name = name;
    }
    public String announce() {
        return genderPrefix() + name;
    }

    protected abstract String genderPrefix();
}
