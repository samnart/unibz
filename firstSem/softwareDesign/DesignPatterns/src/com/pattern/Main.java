package com.pattern;

import com.pattern.memento.Editor;
import com.pattern.memento.History;
import com.pattern.state.BrushTool;
import com.pattern.state.Canvas;
import com.pattern.state.SelectionTool;

public class Main {
    public static void main(String[] args) {
        var canvas = new Canvas();
        canvas.setCurrentTool((new BrushTool()));
        canvas.mouseDown();
        canvas.mouseUp();
    }
}