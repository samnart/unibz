package src.main;

public class manTreatment extends Treatment {
    public manTreatment(String name) {
        super(name);
    }

    @Override
    protected String genderPrefix() {
        return "Mr. ";
    }
}
