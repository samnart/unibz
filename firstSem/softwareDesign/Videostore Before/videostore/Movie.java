package videostore;

public class Movie {

	public static final int CHILDRENS = 2;
	public static final int REGULAR = 0;
	public static final int NEW_RELEASE = 1;

	private String title;
	private Price price;

	public Movie(String title, int priceCode) {
		this.title = title;
		setPriceCode(priceCode);
	}

	public int getPriceCode() {
		return price.getPriceCode();
	}

	public void setPriceCode(int priceCode) {
		switch (priceCode) {
			case REGULAR:
				price = new RegularPrice();
				break;
			case NEW_RELEASE:
				price = new NewReleasePrice();
				break;
			case CHILDRENS:
				price = new ChildrensPrice();
				break;
			default:
				throw new IllegalArgumentException("Invalid price code");
		}
	}

	public String getTitle() {
		return title;
	}

	public double calculateRentalAmount(int daysRented) {
		return price.calculateRentalAmount(daysRented);
	}

	public int calculateFrequentRenterPoints(int daysRented) {
		return price.calculateFrequentRenterPoints(daysRented);
	}
}
