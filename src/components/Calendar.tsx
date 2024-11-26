import React, { useState, useEffect } from "react";
import { useCalendar } from "../hooks/useCalendar";
import Note from "./Note";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const Calendar: React.FC = () => {
  const { currentMonth, handlePreviousMonth, handleNextMonth, addNote } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notes, setNotes] = useState<{ date: string; title: string }[]>([]);

  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    const newNote = { date: selectedDate, title: noteTitle };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    addNote(selectedDate, noteTitle);
    setIsModalOpen(false);
    setNoteTitle("");
  };

  const handleEditNote = (date: string, title: string) => {
    setSelectedDate(date);
    setNoteTitle(title);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (date: string) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter(note => note.date !== date);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-4xl w-full">
      <div className="flex justify-between items-center mb-4">
        
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          &lt; Orqaga
        </button>
        <h2 className="text-lg font-bold">
          {currentMonth.toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Oldinga &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        <div className="text-center font-bold">Sun</div>
        <div className="text-center font-bold">Mon</div>
        <div className="text-center font-bold">Tue</div>
        <div className="text-center font-bold">Wed</div>
        <div className="text-center font-bold">Thu</div>
        <div className="text-center font-bold">Fri</div>
        <div className="text-center font-bold">Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const date = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
          const isSunday = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 0;

          return (
            <div
              key={day}
              className={`border border-gray-200 rounded p-2 text-center ${isSunday ? 'text-red-500' : ''}`}
              onClick={() => {
                setSelectedDate(date);
                setIsModalOpen(true);
              }}
            >
              <div className="text-sm font-semibold">{day}</div>
              <div>
                {notes
                  .filter((note) => note.date === date)
                  .slice(0, 3)
                  .map((note, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <Note title={note.title} />
                      <div className="grid gap-2">
                        <button onClick={() => handleEditNote(date, note.title)} className="text-blue-500">
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button onClick={() => handleDeleteNote(date)} className="text-red-500 ml-2">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f0f0f0' }}>
            <h2 className="text-lg font-bold mb-4">Malumot qoshish</h2>
            <textarea
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="border w-full px-4 py-2 mb-4 rounded resize-none"
              rows={3}
            />
            <p className="text-sm text-gray-500 mb-4">{selectedDate}</p>
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Qoshish
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Orqaga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
