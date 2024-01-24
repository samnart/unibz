package src.main;

public abstract class Treatment {
    private String name;
    private Title title = new Untitled();

    public Treatment(String name) {
        this.name = name;
    }

    public String announce() {
        return title.abbreviation() + genderPrefix() + name;
    }

    protected abstract String genderPrefix();

    public void setTitle(Title title) {
        this.title = title;
    }
}
