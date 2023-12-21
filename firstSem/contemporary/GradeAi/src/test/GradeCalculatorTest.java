package src.test;

import org.junit.jupiter.api.Test;
import src.main.Grade;
import src.main.GradeCalculator;

import static org.junit.jupiter.api.Assertions.*;

public class GradeCalculatorTest {

    @Test
    public void testCalculateGrade_ValidInput_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(50, 10.0f);
        assertTrue(grade.isApproved());
        assertEquals(30, grade.getNumericGrade());
        assertTrue(grade.isCumLaude());
    }

    @Test
    public void testCalculateGrade_LowExamGrade_Fail() {
        assertThrows(Exception.class, () -> GradeCalculator.calculateGrade(50, -1.0f));
    }

    @Test
    public void testCalculateGrade_HighExamGrade_Fail() {
        assertThrows(Exception.class, () -> GradeCalculator.calculateGrade(50, 11.0f));
    }

    @Test
    public void testCalculateGrade_NegativeLabPoints_Fail() {
        assertThrows(Exception.class, () -> GradeCalculator.calculateGrade(-10, 5.0f));
    }

    @Test
    public void testCalculateGrade_LowLabPoints_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(24, 8.0f);
        assertFalse(grade.isApproved());
        assertEquals(0, grade.getNumericGrade());
    }

    @Test
    public void testCalculateGrade_RoundDownLabPoints_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(30, 8.0f);
        assertTrue(grade.isApproved());
        assertEquals(16, grade.getNumericGrade());
    }

    @Test
    public void testCalculateGrade_RoundNormalLabPoints_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(35, 8.0f);
        assertTrue(grade.isApproved());
        assertEquals(18, grade.getNumericGrade());
    }

    @Test
    public void testCalculateGrade_RoundUpLabPoints_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(45, 8.0f);
        assertTrue(grade.isApproved());
        assertEquals(22, grade.getNumericGrade());
    }

    @Test
    public void testCalculateGrade_ExceedMaxLabPoints_Pass() throws Exception {
        Grade grade = GradeCalculator.calculateGrade(65, 8.0f);
        assertTrue(grade.isApproved());
        assertEquals(30, grade.getNumericGrade());
        assertTrue(grade.isCumLaude());
    }
}
