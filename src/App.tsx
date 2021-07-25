import React, { useState, useEffect } from 'react';
import RightArrow from './RightArrow';
import './App.css';

interface RGBColor {
  r: number,
  g: number,
  b: number,
}

function getRandomValue(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
  return {
    r: getRandomValue(0, 255),
    g: getRandomValue(0, 255),
    b: getRandomValue(0, 255),
  }
}

function formatColor(randomColor: RGBColor) {
  const { r, g, b } = randomColor;
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`
  }
}

const initialRandomColor = getRandomColor();

function App() {
  const [rgb, setRgb] = useState({
    r: 50,
    g: 125,
    b: 150,
  });

  const [color, setColor] = useState('r' as keyof RGBColor);

  const [randomColor, setRandomColor] = useState(initialRandomColor);

  useEffect(() => {
    if (JSON.stringify(rgb) === JSON.stringify(randomColor)) {
      alert('Congrats! You did it!');

      setRandomColor(getRandomColor());
    }
  }, [rgb, randomColor, setRandomColor])

  const { r, g, b } = rgb;

  function handleColorChange(e: React.MouseEvent, color: keyof RGBColor, number: number) {
    setRgb((prev) => {
      if (prev[color] + number > 255) {
        return {
          ...prev,
          [color]: 255
        }
      } else if (prev[color] + number < 0) {
        return {
          ...prev,
          [color]: 0
        }
      }

      return {
        ...prev,
        [color]: prev[color] + number
      }
    })
  }

  const marginOfError = Math.abs(rgb.r - randomColor.r) + Math.abs(rgb.g - randomColor.g) + Math.abs(rgb.b - randomColor.b);

  const hasReachedMarginOfError: boolean = marginOfError < 100 && marginOfError % 10 === 0 || marginOfError === 5;

  return (
    <div className="ColorGame">
      <h2 className="ColorGame-title">RGB Color Matcher</h2>
      <div className="ColorGame-colorOptions">
        <input id="red" type="radio" name="colorSelect" checked={color === 'r'} onChange={() => setColor('r')} className="ColorGame-button ColorGame-button--red" />
        <label className="ColorGame-label ColorGame-label--red" htmlFor="red"><span className="ColorGame-hiddenText">Red</span></label>
        <input id="green" type="radio" name="colorSelect" checked={color === 'g'} onChange={() => setColor('g')} className="ColorGame-button ColorGame-button--green" />
        <label className="ColorGame-label ColorGame-label--green" htmlFor="green"><span className="ColorGame-hiddenText">Green</span></label>
        <input id="blue" type="radio" name="colorSelect" checked={color === 'b'} onChange={() => setColor('b')} className="ColorGame-button ColorGame-button--blue" />
        <label className="ColorGame-label ColorGame-label--blue" htmlFor="blue"><span className="ColorGame-hiddenText">Blue</span></label>
      </div>
      <div className="ColorGame-buttonWrap">
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, -10)}>-10</button>
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, -5)}>-5</button>
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, -1)}>-1</button>
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, 1)}>+1</button>
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, 5)}>+5</button>
        <button className="ColorGame-buttonHalf" onClick={(e) => handleColorChange(e, color, 10)}>+10</button>
      </div>
      <div className="ColorGame-colorsWrap">
        <div className="ColorGame-previewColor" style={formatColor(rgb)}>
          <div className="ColorGame-centeredText">
            <span className="ColorGame-text">
              <p>r: <span className="ColorGame-number">{r}</span></p>
              <p>g: <span className="ColorGame-number">{g}</span></p>
              <p>b: <span className="ColorGame-number">{b}</span></p>
            </span>
          </div>
        </div>
        <div className="ColorGame-randomColor" style={formatColor(randomColor)}><div className="ColorGame-centeredText"><span className="ColorGame-text">Match This Color</span></div></div>
        <RightArrow className="ColorGame-rightArrow" />
      </div>
      {hasReachedMarginOfError && (
        <span className="ColorGame-popupText">
          Margin of error: {marginOfError}
        </span>
      )}
    </div>
  );
}

export default App;
