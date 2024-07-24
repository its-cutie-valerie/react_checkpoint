import { useState } from 'react';
import './App.css';

function App() {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentQuote, setCurrentQuote] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationColor, setNotificationColor] = useState('');

  const colors = [
    { name: "Red", hex: "#ff000e" },
    { name: "Orange", hex: "#ff7300" },
    { name: "Yellow", hex: "#fad220" },
    { name: "Green", hex: "#138f3e" },
    { name: "Blue", hex: "#3558a0" },
    { name: "Purple", hex: "#880082" },
  ];

  const quotes = [
    "How many programmers does it take to change a light bulb? None, that’s a hardware problem. – Unknown",
    "Programming is like sex: One mistake and you have to support it for the rest of your life. - Unknown unfortunately",
    "Nothing is as permanent as a temporary solution that works. - Unknown",
    "Code never lies, comments sometimes do. - Unknown",
    "One of my most productive days was throwing away 1000 lines of code. - Ken Thompson",
    "The most exciting phrase to hear in software development is not 'Eureka!' but 'That's funny... - Anonymous",
    "Code is like humor. When you have to explain it, it’s bad. - Cory House"
  ];
//mess of a clicking code, shows notification, copies the color code and shows some very motivational quote
  const handleColorClick = (color) => {
    setFocusedIndex(colors.findIndex(c => c.hex === color.hex));
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    navigator.clipboard.writeText(color.hex).then(() => {
      setNotification(`Copied color code: ${color.hex}`);
      setNotificationColor(color.hex);
      setTimeout(() => setNotification(''), 2000);
    });
  };
//hover
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
//outhovered the hover
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <h1>Welcome to my Codédex Checkpoint Project</h1>
      <h2>Color Picker</h2>

      {currentQuote && (
        <div className="quote-container">
          <h3>Quote of the Moment</h3>
          <p>{currentQuote}</p>
        </div>
      )}

      {notification && (
        <div className="notification" style={{ 
          backgroundColor: notificationColor,
          boxShadow: `0 4px 8px ${notificationColor}`
        }}>
          {notification}
        </div>
      )}

      <div className="color-container">
        {colors.map((color, index) => (
          <div
            key={color.hex}
            className={`color-box ${focusedIndex === index ? 'focused' : ''}`}
            style={{ 
              backgroundColor: color.hex,
              boxShadow: `0 4px 8px ${color.hex}`
            }}
            onClick={() => handleColorClick(color)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`color-overlay ${hoveredIndex === index ? 'show' : ''}`}>
              {color.hex}
            </div>
            {color.name}
          </div>
        ))}
      </div>

      <p>Made with ❤️ by Valérie <br /><a href="https://www.codedex.io/@adorkababe" target='blank'>@adorkababe</a></p>
    </>
  );
}

export default App;
