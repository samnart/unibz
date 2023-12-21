package videostore;

public class NewReleasePrice extends Price {
    int getPriceCode() {
        return Movie.NEW_RELEASE;
    }

    double calculateRentalAmount(int daysRented) {
        return daysRented * 3.0;
    }

    int calculateFrequentRenterPoints(int daysRented) {
        return (daysRented > 1) ? 2 : 1;
    }
}
