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
}
