package main;

public class Grade {
    public static class GradeResult {
        private boolean approved;
        private int numericGrade;
        private boolean cumLaude;

        public GradeResult(boolean approved, int numericGrade, boolean cumLaude) {
            this.approved = approved;
            this.numericGrade = numericGrade;
            this.cumLaude = cumLaude;
        }

        public boolean isApproved() {
            return approved;
        }
        public int getNumericGrade() {
            return numericGrade;
        }
        public boolean isCumLaude() {
            return cumLaude;
        }
    }

    public static GradeResult calculateGrade(int labPoints, float examGrade) throws Exception {
        if (labPoints < 0 || examGrade < 0 || examGrade > 10) {
            throw new Exception("Invalid input values");
        }

        int roundedLapPoints = calculateRoundedLabPoints(labPoints);
        float totalGrade = calculateTotalGrade(examGrade, roundedLapPoints);

        boolean approved = totalGrade >= 18;
        int numericGrade = Math.min((int) totalGrade, 30);
        boolean cumLaude = totalGrade > 30;

        return new GradeResult(approved, numericGrade, cumLaude);
    }

    private static int calculateRoundedLabPoints(int labPoints) {
        if (labPoints < 25) {
            return labPoints;
        } else if (labPoints <= 40) {
            return Math.round(labPoints / 5) * 5;
        } else {
            return Math.min(40 + ((labPoints - 40) / 5), 50);
        }
    }

    private static float calculateTotalGrade(float examGrade, int roundedLabPoints) {
        float labPointsFactor = Math.min(roundedLabPoints / 50.0f, 1.0f);
        float examPoints = Math.min(examGrade + (roundedLabPoints - 50) / 5.0f, 10.0f);
        return (examPoints * 0.5f) + (labPointsFactor * 0.5f) * 10.0f;
    }
}
