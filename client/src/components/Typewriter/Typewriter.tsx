import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
  const fonts = ['Arial', 'Times New Roman', 'Verdana', 'Courier New'];
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<string>(fonts[Math.floor(Math.random() * fonts.length)]);

  useEffect(() => {
    const speed = 200; // Adjust typing speed here (milliseconds)
    const delete_speed = 100;
    let timer: number;

    if (!isDeleting && currentIndex === text.length) {
      // Finished typing current line, wait for a while before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Adjust waiting time before deletion here (milliseconds)
    }
    else if (!isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
    }
    else if (isDeleting && currentIndex === 0) {
      // Finished deleting current line, reset to start typing new line
      timer = setTimeout(() => {
        setFontFamily(fonts[Math.floor(Math.random() * fonts.length)]);
        setIsDeleting(false);
        setCurrentIndex(0);
      }, 2000); // Adjust waiting time before typing new line here (milliseconds)
    }
    else {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        if (currentIndex === 0) {
          setIsDeleting(false);
        }
      }, delete_speed); // Adjust deleting speed here
    }
    return () => clearTimeout(timer); // Cleanup
  }, [text, currentIndex, isDeleting]);

  const style = {
    fontSize: '16em',
    fontFamily: fontFamily // Set the font family dynamically
  };

  return (
    <div className='typewriter-container'>
      <span className='display-text' style={style}>
        {displayText}
      </span>
      <span className="blinking-cursor" style={style}>
        |
      </span>
    </div>
  );
};

export default Typewriter;