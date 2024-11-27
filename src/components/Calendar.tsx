import React, { useState, useEffect } from "react";
import { useCalendar } from "../hooks/useCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

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
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.date !== date)
    );
  };

  return (
    <div className="p-6 rounded-lg shadow-md max-w-[1200px] w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-200 transition"
          >
            &lt;
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-200 transition"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 uppercase">{day}</div>
        ))}
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
              className={`border relative p-4 min-h-20 bg-white shadow-sm hover:shadow-md transition ${isSunday ? "text-red-600" : "text-gray-800"}`}
              onClick={() => {
                setSelectedDate(date);
                setIsModalOpen(true);
              }}
            >
              <div className="text-lg absolute font-semibold right-2 top-0">{day}</div>
              {notes
                .filter((note) => note.date === date)
                .map((note, idx) => (
                  <div
                    key={idx}
                    className="mt-2 bg-blue-100 text-blue-700 px-2 py-1 border border-blue-300 flex justify-between items-center shadow overflow-hidden"
                    style={{ maxWidth: "250px" }}
                  >
                    <span className="text-sm truncate font-medium">{note.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteNote(date)}
                        className="text-red-500 text-xs hover:underline whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => handleEditNote(date, note.title)}
                        className="text-blue-500 text-xs hover:underline whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-6 text-center">Add New Event</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <textarea
                placeholder="Enter note title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border w-full px-4 py-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handleAddNote()}
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Add Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
