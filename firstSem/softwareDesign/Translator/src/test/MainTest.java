package test;
import main.Translator;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class MainTest {

    @Test
    public void testMain() {
        Translator translator = new Translator();
        translator.addTranslation("Apple", List.of("Mela", "Pin Guo"));
        assertEquals("Mela, Pin Guo", translator.translate("Apple"));
    }
}
