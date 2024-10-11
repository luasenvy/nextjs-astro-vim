"use client";

import classnames from "classnames";
import { useState } from "react";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState<Array<string>>([]);

  const handleInputSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.toLowerCase();
    if (!query.length) return;

    // Simulate search results (replace with actual search logic)
    setSearchResult(
      ["Result 1", "Result 2", "Result 3"].filter((result) => result.toLowerCase().includes(query))
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="w-full bg-gray-800 text-green-400 border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        onInput={handleInputSearch}
      />
      <div
        id="search-results"
        className={classnames(
          "absolute top-full left-0 right-0 bg-gray-800 border border-green-400 rounded mt-1",
          { hidden: !searchResult.length }
        )}
      >
        {searchResult.map((result, i) => (
          <div key={`result-${i}`} className="p-2 hover:bg-gray-700">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
