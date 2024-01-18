package src.main;

public class TransferMockOperation implements Operation {

    private String lastMethod;

    @Override
    public void executeOperation() {
        lastMethod = "executeOperation";
    }

    @Override
    public void cancelOperation() {
        lastMethod = "cancelOperation";
    }

    @Override
    public void OperationMetadata() {

    }

    @Override
    public void operationMetadata() {
    }

    public String getLastMethod() {
        return "";
    }
}
