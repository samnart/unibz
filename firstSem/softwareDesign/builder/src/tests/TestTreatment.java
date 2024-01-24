package src.tests;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import src.main.Treatment;
import src.main.TreatmentBuilder;

public class TestTreatment {
    @Test
    void manTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        Treatment t = builder.manCalled("Giovanni").build();
        assertEquals("Mr. Giovanni", t.announce());
    }

    @Test
    void womanTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        Treatment t = builder.womanCalled("Giovanna").build();
        assertEquals("Mrs. Giovanna", t.announce());
    }

    @Test
    void womanDoctorTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        Treatment t = builder.womanCalled("Giovanna").thatIsDoctor().build();
        assertEquals("Dr. Mrs. Giovanna", t.announce());
    }

    @Test
    void manDoctorTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        Treatment t = builder.manCalled("Giovanni").thatIsDoctor().build();
        assertEquals("Dr. Mr. Giovanni", t.announce());
    }

    @Test
    void manCaptainTreatment() {
        TreatmentBuilder builder = new TreatmentBuilder();
        Treatment t = builder.manCalled("Giovanni").thatIsCaptain().build();
        assertEquals("Mr. Giovanni", t.announce());
    }



}
