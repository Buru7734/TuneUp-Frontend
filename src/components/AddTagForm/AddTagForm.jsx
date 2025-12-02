import { useState } from "react";
import { createTag } from "../../service/tagsServices";

export default function AddTagForm({ onTagCreated }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTag = await createTag(name);
      setMessage(`tag "${newTag.name}" created successfully!`);
      setName("");

      if (onTagCreated) onTagCreated(); // refresh tags in parent
    } catch (error) {
      setMessage(error?.name || "Error creating tag. Please try again.");
    }
  };

  return (
    <div>
      <h3>Create New Tag</h3>

      <div onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tag name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={handleSubmit}>
          Create Tag
        </button>
      </div>

      <div>{message && <p>{message}</p>}</div>
    </div>
  );
}
