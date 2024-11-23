import React, { useState } from "react";
import { useCalendar } from "../hooks/useCalendar";
import Note from "./Note";

const Calendar: React.FC = () => {
  const { currentMonth, notes, handlePreviousMonth, handleNextMonth, addNote } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handleAddNote = () => {
    addNote(selectedDate, noteTitle);
    setIsModalOpen(false);
    setNoteTitle("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-4xl w-full">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt; Prev
        </button>
        <h2 className="text-lg font-bold">
          {currentMonth.toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={idx}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const date = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
          return (
            <div
              key={day}
              className="border border-gray-200 rounded p-2 text-center"
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
                    <Note key={idx} title={note.title} />
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Event</h2>
            <input
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="border w-full px-4 py-2 mb-4 rounded"
            />
            <p className="text-sm text-gray-500 mb-4">{selectedDate}</p>
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Event
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
