package src.test;

import org.junit.jupiter.api.Test;
import src.main.AccessControl;
import src.main.TransferMockOperation;

import static org.junit.Assert.*;

public class AccessControlTest {
    @Test
    void noUser() {
        AccessControl ac = src.main.AccessControl.getInstance();
        boolean access = ac.verifyAccess("guerra", TransferMockOperation.class, "executeOperation");
        assertFalse(access);
    }

    @Test
    void newUser() {
        AccessControl ac = src.main.AccessControl.getInstance();
        ac.addUser("guerra");

        ac.addAccess("guerra", TransferMockOperation.class, "executeOperation");

        boolean access = ac.verifyAccess("guerra", TransferMockOperation.class, "executeOperation");
        assertTrue(access);
    }
}
