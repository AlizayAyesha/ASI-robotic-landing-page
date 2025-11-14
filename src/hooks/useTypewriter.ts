import { useState, useEffect, useCallback } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const useTypewriter = ({ text, speed = 50, delay = 0 }: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const skip = useCallback(() => {
    setDisplayText(text);
    setIsFinished(true);
  }, [text]);

  useEffect(() => {
    const lines = text.split("\n");
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let currentDisplayText = "";

    const typeNextChar = () => {
      if (currentLineIndex >= lines.length) {
        setTimeout(() => setIsFinished(true), 2000);
        return;
      }

      const currentLine = lines[currentLineIndex];

      if (currentCharIndex === 0 && currentLineIndex > 0) {
        currentDisplayText += "\n";
        setDisplayText(currentDisplayText);
      }

      if (currentCharIndex < currentLine.length) {
        currentDisplayText += currentLine[currentCharIndex];
        setDisplayText(currentDisplayText);
        currentCharIndex++;
        timeoutId = setTimeout(typeNextChar, speed / 2);
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextChar, speed * 2);
      }
    };

    timeoutId = setTimeout(typeNextChar, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  return {
    displayText,
    isFinished,
    skip,
  };
};

export default useTypewriter;
