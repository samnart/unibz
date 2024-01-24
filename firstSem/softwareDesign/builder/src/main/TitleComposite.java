package src.main;

public class TitleComposite implements Title{

    private Title title1;
    private Title title2;

    public TitleComposite(Title title1, Title title2) {
        this.title1 = title1;
        this.title2 = title2;
    }

    @Override
    public String abbreviation() {
        return title1.abbreviation() + title2.abbreviation();
    }
}
