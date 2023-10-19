public class grade {
    public static Grade testGrade(int labPoints, float examGrade) throws Exception {
        if (labPoints < 0 || examGrade < 0 || examGrade > 10) {
            throw new Exception("Input values out of range.");
        }

        int labPointsOver50 = Math.max(0, labPoints - 50);
        int examPoints = (labPointsOver50 / 5) + (int) examGrade;

        int numericGrade = Math.min(30, Math.max(17, examPoints));
        boolean isCumLaude = numericGrade == 30;

        boolean isApproved = numericGrade >= 18;

        return new Grade(isApproved, numericGrade, isCumLaude);
    }

    public static void main(String[] args) {
        try {
            Grade result = testGrade(60, 9.5f);
            System.out.println("Is Approved: " + result.isApproved());
            System.out.println("Numeric Grade: " + result.getNumericGrade());
            System.out.println("Cum Laude: " + result.isCumLaude());
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}

class Grade {
    private boolean approved;
    private int numericGrade;
    private boolean cumLaude;

    public Grade(boolean approved, int numericGrade, boolean cumLaude) {
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
