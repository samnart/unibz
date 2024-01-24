package src.main;

public class TreatmentBuilder {

    private Treatment instance;

    public TreatmentBuilder thatIsDoctor() {
        instance.setTitle(new DoctorTitle());
        return this;
    }

    public TreatmentBuilder manCalled(String name) {
        instance = new manTreatment(name);
        return this;
    }

    public TreatmentBuilder womanCalled(String name) {
        instance = new womanTreatment(name);
        return this;
    }

    public Treatment build() {
        return instance;
    }


    public TreatmentBuilder thatIsCaptain() {
        return this;
    }
}
