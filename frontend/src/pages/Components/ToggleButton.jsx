import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';


export default function ToggleButton() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button onClick={toggleDarkMode} className="toggle-button">
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}