package test;

import main.Translator;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class TestTranslator {
    @Test
    public void testTranslator() {
        Translator translator1 = new Translator();
        translator1.addTranslation("hello", List.of("hola", "bonjour"));
        assertEquals("hola, bonjour", translator1.translate("hello"));

//        String sentence = "Hello world!";
//        assertEquals("Hello world!", translator1.translate(sentence));

        Translator translator2 = new Translator();
        translator2.addTranslation("goodbye", List.of("Ciao", "zaijian"));
        assertNull(translator2.translate("unknown"));
    }
}
