import React from "react";
import Calendar from "./components/Calendar";

const App: React.FC = () => {
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <Calendar />
    </div>
  );
};

export default App;
