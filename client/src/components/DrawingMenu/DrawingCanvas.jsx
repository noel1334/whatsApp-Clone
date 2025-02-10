import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const DrawingCanvas = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines([...lines, { points: [point.x, point.y], color: "black" }]); // Start a new line
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // Update the last line with the new point
    const newLines = [...lines];
    const lastLine = newLines[newLines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    setLines(newLines);
  };

  return (
    <Stage
      width={600}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.color}
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingCanvas;
