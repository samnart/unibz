package main;

public class Main {
    public static void main(String[] args) {

//        System.out.println("Hello world!");
        try {
            Grade.GradeResult result = Grade.calculateGrade(50, 10.0f);
            System.out.println("Approved: " + result.isApproved());
            System.out.println("Numeric Grade: " + result.getNumericGrade());
            System.out.println("Cum Laude: " + result.isCumLaude());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}