package src.main;

public abstract class AbstractTreatment implements Treatment {
    private String name;
    private Title title = new Untitled();

    public AbstractTreatment(String name) {
        this.name = name;
    }

    public String announce() {
        return title.abbreviation() + genderPrefix() + name;
    }

    public void setTitle(Title title) {
        this.title = new TitleComposite(this.title, title);
    }

    protected abstract String genderPrefix();
}
