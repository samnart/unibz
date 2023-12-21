import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TranslatorTest {

    @Test
    public void testEmptyTranslator() {
        Translator translator = new Translator();
        assertNull(translator.translateWord("hello"));
        assertNull(translator.translateSentence("Hello, how are you?"));
    }

    @Test
    public void testTranslateUnknownWord() {
        Translator translator = new Translator();
        assertNull(translator.translateWord("unknown"));
    }

    @Test
    public void testTranslateKnownWord() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        assertEquals("hola", translator.translateWord("hello"));
    }

    @Test
    public void testTranslateWordWithMultipleTranslations() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        translator.addTranslation("hello", "bonjour");
        assertEquals("hola, bonjour", translator.translateWord("hello"));
    }

    @Test
    public void testTranslateSentence() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        translator.addTranslation("world", "mundo");
        assertEquals("hola, mundo!", translator.translateSentence("Hello, world!"));
    }

    @Test
    public void testTranslateCaseInsensitive() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        assertEquals("hola", translator.translateWord("HELLO"));
    }

    @Test
    public void testTranslateFromPropertiesFile() {
        // Implement this test as needed based on your file reading mechanism
        // Mock or provide a test properties file for translation
    }

    // Additional Functionality (optional)

    @Test
    public void testKeepPunctuationInSentence() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        assertEquals("¡hola, mundo!", translator.translateSentence("Hello, world!"));
    }

    @Test
    public void testTranslateFirstWordWithUppercase() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        assertEquals("Hola, world!", translator.translateSentence("Hello, world!"));
    }

    @Test
    public void testDoNotTranslateMidSentenceUppercase() {
        Translator translator = new Translator();
        translator.addTranslation("world", "mundo");
        assertEquals("Hello, mundo!", translator.translateSentence("Hello, World!"));
    }

    @Test
    public void testTranslateMultipleSentences() {
        Translator translator = new Translator();
        translator.addTranslation("hello", "hola");
        translator.addTranslation("world", "mundo");
        assertEquals("¡hola, mundo! How are you?", translator.translateSentence("Hello, world! How are you?"));
    }
}

