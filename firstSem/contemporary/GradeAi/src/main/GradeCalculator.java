package src.main;

public class GradeCalculator {

    public static Grade calculateGrade(int labPoints, float examGrade) throws Exception {
        validateInput(labPoints, examGrade);

        int totalPoints = calculateTotalPoints(labPoints);
        int numericGrade = calculateNumericGrade(totalPoints);
        boolean isApproved = numericGrade >= 18;
        boolean isCumLaude = numericGrade == 30 && labPoints > 50;

        return new Grade(isApproved, numericGrade, isCumLaude);
    }

    private static void validateInput(int labPoints, float examGrade) throws Exception {
        if (examGrade < 0 || examGrade > 10 || labPoints < 0) {
            throw new Exception("Invalid input values");
        }
    }

    private static int calculateTotalPoints(int labPoints) {
        int extraPoints = Math.min((labPoints - 50) / 5, 3);
        return Math.min(50, labPoints) + extraPoints;
    }

    private static int calculateNumericGrade(int totalPoints) {
        return Math.min(30, totalPoints * 2);
    }
}

