package main;

import java.util.ArrayList;
import java.util.List;

public class Translator {

    private static class Translation {
        String word;
        List<String> translations;

        public Translation(String word, List<String> translations) {
            this.word = word;
            this.translations = translations;
        }
    }

    private List<Translation> translations;

    public Translator() {
        this.translations = new ArrayList<>();
    }

    public void addTranslation(String word, List<String> translations) {
        Translation newTranslation = new Translation(word, translations);
        this.translations.add(newTranslation);
    }

    public String translate(String input) {
        StringBuilder result = new StringBuilder();
        String[] words = input.split(" ");

        for (String word : words) {
            String translation = translateWord(word);
            result.append(translation != null ? translation : word).append(" ");
        }
        return result.toString().trim();
    }

    private String translateWord(String word) {
        for (Translation translation : translations) {
            if (translation.word.equalsIgnoreCase(word)) {
                return String.join(", ", translation.translations);
            }
        }
        return null;
    }
}
