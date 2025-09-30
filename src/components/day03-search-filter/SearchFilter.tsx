import { useMemo, useState } from "react";
import useDebouncedValue from "./useDebouncedValue";

const DATA = ["Banana", "Apple", "Grape", "Mango", "Peach", "Avocado"];

export default function SearchFilter() {
  const [rawQuery, setRawQuery] = useState<string>("");
  const query = useDebouncedValue(rawQuery, 250);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawQuery(e.currentTarget.value);
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter((item) => item.toLowerCase().includes(q));
  }, [query]);

  const highlightMatch = (
    matchedItem: string,
    query: string
  ): React.ReactNode => {
    if (!query) return matchedItem;
    const matchedIdx = matchedItem.toLowerCase().indexOf(query.toLowerCase());
    if (matchedIdx === -1) return matchedItem;
    const before = matchedItem.slice(0, matchedIdx);
    const match = matchedItem.slice(matchedIdx, matchedIdx + query.length);
    const after = matchedItem.slice(matchedIdx + query.length);

    return (
      <>
        {before}
        <mark className="bg-pink-200 text-blue-900 rounded px-0.5">
          {match}
        </mark>
        {after}
      </>
    );
  };

  return (
    <div>
      <label htmlFor="search-fruits" className="block text-xl font-bold mb-4">
        Search Fruits!
      </label>
      <input
        type="text"
        id="search-fruits"
        className="border border-gray-500 px-4 py-2 outline-none rounded-xl w-[200px]"
        value={rawQuery}
        onChange={onChange}
        placeholder="What do you want?"
      />
      <ul>
        {filteredItems.length === 0 ? (
          <li>No result</li>
        ) : (
          filteredItems.map((item) => (
            <li key={item}>{highlightMatch(item, query)}</li>
          ))
        )}
      </ul>
    </div>
  );
}
