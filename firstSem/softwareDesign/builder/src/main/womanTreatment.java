package src.main;

public class womanTreatment extends AbstractTreatment {
    public womanTreatment(String name) {
        super(name);
    }

    @Override
    protected String genderPrefix() {
        return "Mrs. ";
    }
}
