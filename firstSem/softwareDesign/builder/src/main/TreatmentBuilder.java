package src.main;

import java.security.cert.CertPathBuilder;

public class TreatmentBuilder {
    Treatment instance;
    public TreatmentBuilder manCalled(String name) {
        instance = new manTreatment(name);
        return this;
    }

    public TreatmentBuilder womanCalled(String name) {
//        instance = new womanTreatment(name);
        return this;
    }

    public Treatment build() {
        return instance;
    }
}
