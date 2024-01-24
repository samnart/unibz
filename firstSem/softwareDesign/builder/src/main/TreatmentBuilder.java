package src.main;

public class TreatmentBuilder {

    private Treatment instance;

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

        public Treatment build() {
            return instance;
        }

        public TreatmentAfterGender thatIsCaptain() {
            instance.setTitle(new captainTitle());
            return this;
        }
    }
}
