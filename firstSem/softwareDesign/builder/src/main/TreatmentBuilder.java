package src.main;

public class TreatmentBuilder {

    private AbstractTreatment instance;

    public TreatmentBuilder thatIsDoctor() {
        instance.setTitle(new DoctorTitle());
        return this;
    }

    public TreatmentAfterGender manCalled(String name) {
        instance = new manTreatment(name);
        return new TreatmentAfterGender();
    }

    public TreatmentAfterGender womanCalled(String name) {
        instance = new womanTreatment(name);
        return new TreatmentAfterGender();
    }

    public TreatmentBuilder thatIsCaptain() {
        instance.setTitle(new captainTitle());
        return this;
    }



    public class TreatmentAfterGender {
        public TreatmentAfterGender thatIsDoctor() {
            instance.setTitle(new DoctorTitle());
            return this;
        }

        public AbstractTreatment build() {
            return instance;
        }

        public TreatmentAfterGender thatIsCaptain() {
            instance.setTitle(new captainTitle());
            return this;
        }

        public TreatmentAfterGender from(String place) {
            instance = new placeProxy(instance, place);
            return this;
        }
    }
}
