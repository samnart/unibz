package src.test;

import org.junit.jupiter.api.Test;
import src.main.*;

import static org.junit.jupiter.api.Assertions.*;

public class SecureOperationTest {

    @Test
    void blockNonExistingUser() {
        TransferMockOperation transferMockOperation = new TransferMockOperation();
        Operation operation = new SecureOperation(transferMockOperation);

        CurrentUser.setUser("guerra");
        assertThrows(MyAccessControlException.class, () -> operation.cancelOperation());
    }

    @Test
    void authorizeUser() {
        AccessControl.getInstance().addUser("guerra");
        AccessControl.getInstance().addAccess("guerra",
                TransferMockOperation.class, "cancelOperation");
        TransferMockOperation transferMockOperation = new TransferMockOperation();
        Operation secureOperation = new SecureOperation(transferMockOperation);
        Operation dynamicProxy = SecureOperation.createProxy(secureOperation);

        CurrentUser.setUser("guerra");

        dynamicProxy.cancelOperation();
        assertEquals("cancelOperation", transferMockOperation.getLastMethod());
    }
}
