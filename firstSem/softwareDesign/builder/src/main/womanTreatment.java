package src.main;

public class womanTreatment extends Treatment{
    public womanTreatment(String name) {
        super(name);
    }

    @Override
    protected String genderPrefix() {
        return "Mrs. ";
    }
}
