package main;

import java.util.List;

public class Main {
    public static void main(String[] args) {

    Translator translator = new Translator();
    translator.addTranslation("hello", List.of("hola", "bonjour"));

    String sentence = "Hello world!";
    String translateSentence = translator.translate(sentence);

    System.out.println("Translated Sentence: " + translateSentence);
    }
}