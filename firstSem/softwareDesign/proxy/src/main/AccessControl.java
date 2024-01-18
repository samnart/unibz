package src.main;

import java.util.HashMap;
import java.util.Map;

public class AccessControl {

    private static AccessControl instance;
    private Map<String, AccessInfo> accessInfoMap;

    private AccessControl() {
        this.accessInfoMap = new HashMap<>();
    }

    public synchronized static AccessControl getInstance() {
        if (instance == null) {
            instance = new AccessControl();
        }
        return instance;
    }

    public void addUser(String username) {
    }

    public void addAccess(String username, Class<?> clazz, String methodName) {
        AccessInfo accessInfo = new AccessInfo(clazz, methodName);
        accessInfoMap.put(username, accessInfo);
    }

    public boolean verifyAccess(String username, Class<?> clazz, String methodName) {
        AccessInfo accessInfo = accessInfoMap.get(username);
        return accessInfo != null && accessInfo.equals(new AccessInfo(clazz, methodName));
    }

    class AccessInfo {
        private Class<?> clazz;
        private String methodName;

        public AccessInfo(Class<?> clazz, String methodName) {
            this.clazz = clazz;
            this.methodName = methodName;
        }

        @Override
        public int hashCode() {
            // Implementation
            return 0;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            AccessInfo other = (AccessInfo) obj;
            return clazz.equals(other.clazz) && methodName.equals(other.methodName);
        }
    }
}
