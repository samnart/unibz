package videostore.test;

import videostore.*;
import junit.framework.TestCase;

public class TestCustomer extends TestCase {
	
	Customer client;

	protected void setUp() throws Exception {
		client = new Customer("Joao");
	}
	
	public void testNameCreation(){
		String result = client.statement();
		assertContain(result,"Rental Record for Joao");
	}
	
	public void testOneRegularOneDay(){
		rentMovie("Indiana Jones",Movie.REGULAR,1);
		String result = client.statement();
		assertContain(result,"Amount owed is 2.0");
		assertContain(result,"You earned 1 frequent renter points");
	}
	
	public void testOneRegularTreeDays(){
		rentMovie("Indiana Jones",Movie.REGULAR,3);
		String result = client.statement();
		assertContain(result,"Amount owed is 3.5");
		assertContain(result,"You earned 1 frequent renter points");
	}
	
	public void testOneChildrensOneDay(){
		rentMovie("Finding Nemo",Movie.CHILDRENS,1);
		String result = client.statement();
		assertContain(result,"Amount owed is 1.5");
		assertContain(result,"You earned 1 frequent renter points");
	}
	
	public void testOneChildrensFiveDays(){
		rentMovie("Finding Nemo",Movie.CHILDRENS,5);
		String result = client.statement();
		assertContain(result,"Amount owed is 4.5");
		assertContain(result,"You earned 1 frequent renter points");
	}
	
	public void testOneNewReleaseOneDay(){
		rentMovie("Spider Man - Far from Home",Movie.NEW_RELEASE,1);
		String result = client.statement();
		assertContain(result,"Amount owed is 3.0");
		assertContain(result,"You earned 1 frequent renter points");
	}
	
	public void testOneNewReleaseTreeDays(){
		rentMovie("Spider Man - Far from Home",Movie.NEW_RELEASE,3);
		String result = client.statement();
		assertContain(result,"Amount owed is 9.0");
		assertContain(result,"You earned 2 frequent renter points");
	}
	
	public void testManyRents(){
		rentMovie("Spider Man - Far from Home",Movie.NEW_RELEASE,2);
		rentMovie("Dune",Movie.NEW_RELEASE,3);
		rentMovie("Finding Nemo",Movie.CHILDRENS,3);
		rentMovie("Indiana Jones",Movie.REGULAR,2);
		rentMovie("The Lion King",Movie.CHILDRENS,4);
		rentMovie("Matrix",Movie.REGULAR,3);
		String result = client.statement();
		assertContain(result,"Amount owed is 25.0");
		assertContain(result,"You earned 8 frequent renter points");
	}
	
	private void rentMovie(String title, int type, int days) {
		Movie movie = new Movie(title,type);
		Rental rent = new Rental(movie,days);
		client.addRental(rent);
	}

	private void assertContain(String result, String content) {
		assertTrue(result.contains(content));
	}
	
}
