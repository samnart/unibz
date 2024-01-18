package src.main;

public class SecureOperation implements Operation {

    private Operation operation;

    public SecureOperation(Operation operation) {
        this.operation = operation;
    }

    @Override
    public void executeOperation() {
        // Implementation
    }

    @Override
    public void cancelOperation() {
        if (CurrentUser.getUser() == null) {
            throw new MyAccessControlException();
        }
        AccessControl ac = AccessControl.getInstance();
        if (!ac.verifyAccess(CurrentUser.getUser(), operation.getClass(), "cancelOperation")) {
            throw new MyAccessControlException();
        }
        operation.cancelOperation();
    }

    @Override
    public void OperationMetadata() {

    }

    @Override
    public void operationMetadata() {
        // Implementation
        if (CurrentUser.getUser() == null) {
            throw new MyAccessControlException();
        }
        AccessControl ac = AccessControl.getInstance();
        if (!ac.verifyAccess(CurrentUser.getUser(), operation.getClass(), "operationMetadata")) {
            throw new MyAccessControlException();
        }
        operation.operationMetadata();
    }

    public static Operation createProxy(Operation operation) {
        return DynamicProxyHandler.createProxy(operation, Operation.class);
    }
}
