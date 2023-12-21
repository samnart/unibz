package src.main;

public class Grade {
    private final boolean isApproved;
    private final int numericGrade;
    private final boolean isCumLaude;

    public Grade(boolean isApproved, int numericGrade, boolean isCumLaude) {
        this.isApproved = isApproved;
        this.numericGrade = numericGrade;
        this.isCumLaude = isCumLaude;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public int getNumericGrade() {
        return numericGrade;
    }

    public boolean isCumLaude() {
        return isCumLaude;
    }
}

