import React, { useState } from "react";

interface ModalProps {
  date: string;
  onClose: () => void;
  onAdd: (date: string, title: string) => void;
}

const Modal: React.FC<ModalProps> = ({ date, onClose, onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(date, title);
      setTitle("");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Event</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>{date}</p>
        <button onClick={handleSubmit}>Add Event</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
