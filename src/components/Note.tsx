import React from "react";

interface NoteProps {
  title: string;
}

const Note: React.FC<NoteProps> = ({ title }) => {
  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-800 text-sm rounded px-2 py-1 mt-2">
      {title}
    </div>
  );
};

export default Note;
