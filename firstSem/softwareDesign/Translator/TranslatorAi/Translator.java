import java.util.HashMap;
import java.util.Map;

public class Translator {

    private final Map<String, String> translations;

    public Translator() {
        this.translations = new HashMap<>();
    }

    public void addTranslation(String word, String translation) {
        translations.put(word.toLowerCase(), translation);
    }

    public String translateWord(String word) {
        return translations.getOrDefault(word.toLowerCase(), null);
    }

    public String translateSentence(String sentence) {
        String[] words = sentence.split("\\s+");
        StringBuilder translatedSentence = new StringBuilder();

        for (String word : words) {
            if (translatedSentence.length() > 0) {
                translatedSentence.append(" ");
            }

            if (Character.isUpperCase(word.charAt(0))) {
                translatedSentence.append(translateWord(word));
            } else {
                translatedSentence.append(word);
            }
        }

        return translatedSentence.toString();
    }
}
