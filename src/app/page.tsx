"use client";

import { useCallback, useEffect, useState } from "react";
import AdvocatesTable from "./components/AdvocatesTable";
import { Advocate } from "./types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  // Potentially use something like react-query here for better loading/error states/caching/overall developer ergonomics.
  useEffect(() => {
    fetch(`/api/advocates?search=${searchTerm}&page=${page}&limit=5`).then(
      (response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        });
      }
    );
  }, [searchTerm, page]);

  // TODO: debounce this. Don't wanna this to trigger an API call on every keystroke
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClickReset = useCallback(() => {
    setSearchTerm("");
    setPage(0);
  }, []);

  return (
    <main className="m-12">
      <h1>Solace Health &#62; Find an advocate</h1>
      <div className="my-4">
        <p>Search</p>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 min-w-96"
          onChange={onChange}
          placeholder="Type to search by name, city, or degree"
        />
        <button
          onClick={onClickReset}
          className="border border-gray-300 rounded-md p-1 ml-2"
        >
          Reset
        </button>
      </div>
      <AdvocatesTable advocates={advocates} />
      {/* TODO: pagination could be its own component. Or encapsulated in the table itself */}
      <div className="flex justify-between ph-2 mt-4">
        <button
          disabled={page == 0} // TODO: would need total pages to disable "Next" button
          className="border border-gray-300 rounded-md p-1"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <div>Page {page + 1}</div>
        <button
          className="border border-gray-300 rounded-md p-1"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
}
