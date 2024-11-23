import { useState } from "react";

interface Note {
  date: string;
  title: string;
}

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notes, setNotes] = useState<Note[]>([]);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const addNote = (date: string, title: string) => {
    setNotes((prev) => [...prev, { date, title }]);
  };

  return {
    currentMonth,
    notes,
    handlePreviousMonth,
    handleNextMonth,
    addNote,
  };
};
