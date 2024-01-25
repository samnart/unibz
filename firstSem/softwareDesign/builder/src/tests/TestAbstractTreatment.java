package src.tests;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import src.main.AbstractTreatment;
import src.main.TreatmentBuilder;

public class TestAbstractTreatment {
    @Test
    void manTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.manCalled("Giovanni").build();
        assertEquals("Mr. Giovanni", t.announce());
    }

    @Test
    void womanTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.womanCalled("Giovanna").build();
        assertEquals("Mrs. Giovanna", t.announce());
    }

    @Test
    void womanDoctorTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.womanCalled("Giovanna").thatIsDoctor().build();
        assertEquals("Dr. Mrs. Giovanna", t.announce());
    }

    @Test
    void manDoctorTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.manCalled("Giovanni").thatIsDoctor().build();
        assertEquals("Dr. Mr. Giovanni", t.announce());
    }

    @Test
    void manCaptainTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
//        builder.womanCalled("test").thatIsDoctor().build();
        AbstractTreatment t = builder.manCalled("Giovanni").thatIsCaptain().build();
        assertEquals("Cap. Mr. Giovanni", t.announce());
    }

    @Test
    void womanCaptainTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.womanCalled("Giovanna").thatIsCaptain().build();
        assertEquals("Cap. Mrs. Giovanna", t.announce());
    }

    @Test
    void manDoctorCaptainTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.manCalled("John").thatIsCaptain().thatIsDoctor().build();
        assertEquals("Cap. Dr. Mr. John", t.announce());
    }

    @Test
    void womanDoctorCaptainTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.womanCalled("Joana").thatIsCaptain().thatIsDoctor().build();
        assertEquals("Cap. Dr. Mrs. Joana", t.announce());
    }

    @Test
    void manDoctorCaptainTreatmentFromPlace() {
        TreatmentBuilder builder = new TreatmentBuilder();
        AbstractTreatment t = builder.manCalled("John").thatIsCaptain().thatIsDoctor().from("Trento").build();
        assertEquals("Cap. Dr. Mr. John of Trento", t.announce());
    }



}
