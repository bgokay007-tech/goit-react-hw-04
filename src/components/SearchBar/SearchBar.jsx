import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Lütfen arama giriniz!");
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}