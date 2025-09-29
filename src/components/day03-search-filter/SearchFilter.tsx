import { useMemo, useState } from "react";

const DATA = ["Banana", "Apple", "Grape", "Mango", "Peach", "Avocado"];

export default function SearchFilter() {
  const [query, setQuery] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter((item) => item.toLowerCase().includes(q));
  }, [query]);

  const highlightMatch = (matchedItem: string, query: string) => {
    if (!query) return matchedItem;
    const matchedIdx = matchedItem.toLowerCase().indexOf(query.toLowerCase());
    if (matchedIdx === -1) return matchedItem;
    const before = matchedItem.slice(0, matchedIdx);
    const match = matchedItem.slice(matchedIdx, matchedIdx + query.length);
    const after = matchedItem.slice(matchedIdx + query.length);

    return (
      <>
        {before}
        <mark className="text-blue-300">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div>
      <h1 className="font-bold mb-4">Search Fruits!</h1>
      <input
        type="text"
        className="border border-gray-500 px-4 py-2 outline-none rounded-xl w-[200px]"
        value={query}
        onChange={onChange}
        placeholder="Type filter"
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
