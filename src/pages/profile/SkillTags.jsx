import React, { useState } from "react";

const SkillTags = () => {
  const [tags, setTags] = useState([
    "EthicalLeadership",
    "EthicalDecisionMaking",
    "EthicalSourcing",
  ]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        setInput("");
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 border p-2 rounded">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            <span className="text-sm">#{tag}</span>
            <button
              className="ml-2 text-sm font-bold text-blue-600 hover:text-red-500"
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </div>
        ))}
        <input
          className="flex-1 outline-none p-1 text-sm"
          type="text"
          placeholder="e.g. Programming or Microsoft Office"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default SkillTags;
