package src.main;

public class placeProxy extends AbstractTreatment {

    private Treatment treatment;
    private String place;

    public placeProxy(Treatment treatment, String place) {
        super("");
        this.treatment = treatment;
        this.place = place;
    }

    @Override
    public String announce() {
        return treatment.announce() + " of " + place;
    }

    @Override
    public void setTitle(Title title) {
        treatment.setTitle(title);
    }

    @Override
    protected String genderPrefix() {
        return null;
    }
}
