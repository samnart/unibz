package videostore;

public class RegularPrice extends Price {
    int getPriceCode() {
        return Movie.REGULAR;
    }

    double calculateRentalAmount(int daysRented) {
        double rentalAmount = 2;
        if (daysRented > 2) {
            rentalAmount += (daysRented - 2) * 1.5;
        }
        return rentalAmount;
    }
}
