package test;

import main.Grade;
import org.junit.Test;

import static org.junit.Assert.*;

public class GradeTest {
    @Test
    public void testCalculateGrade() {
        try {
            Grade.GradeResult result = Grade.calculateGrade(50, 10.0f);
            assertTrue(result.isApproved());
            assertEquals(30, result.getNumericGrade());
            assertTrue(result.isCumLaude());
        } catch (Exception e) {
            fail("Exception not expected: " + e.getMessage());
        }
    }

    @Test(expected = Exception.class)
    public void testInvalidInputValues() throws Exception {
        Grade.calculateGrade(-1, 10.0f);
    }
}
