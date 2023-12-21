package videostore;

abstract class Price {
    abstract int getPriceCode();

    abstract double calculateRentalAmount(int daysRented);

    int calculateFrequentRenterPoints(int daysRented) {
        return 1;
    }
}
