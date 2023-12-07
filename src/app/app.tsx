import { Fetch } from "components/atoms/fetch/fetch";
import { Book, BookList } from "components/organisms/book-list";
import { ChangeEvent, MouseEvent, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

{
  //RENDER BOOKLIST+BOOKDETAILS
}
interface SearchResponse {
  numFound: number;
  docs: Book[];
}

function App() {
  const [bookName, setBookName] = useState("");
  const [fetchUri, setFetchUri] = useState("");


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };


  const encodedBookName = encodeURIComponent(bookName);
  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFetchUri(`https://openlibrary.org/search.json?q=${encodedBookName}`);
  };


  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-start gap-4 mt-20 text-center">
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Book Name"
          required
          value={bookName}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search Books
      </button>
      <div className="flex flex-col ">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Fetch<SearchResponse>
            uri={fetchUri}
            renderData={(data) => (
              <div className="flex flex-col">
                <div>Found {data.numFound} books</div>
                <BookList books={data.docs} />
              </div>
            )}
          ></Fetch>
        </ErrorBoundary>
        <div className="pl-4 mt-4 " style={{ width: '600px'}}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
