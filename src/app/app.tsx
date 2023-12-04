import { ChangeEvent, MouseEvent, useState } from "react";
import { Book, BookList } from "components/organisms/book-list";
import { useFetch } from "hooks/use-fetch";

interface SearchResponse {
  numFound: number;
  docs: Book[];
}

function App() {
  const [bookName, setBookName] = useState("");
  const [fetchUri, setFetchUri] = useState("");
  //const { data, statusloading, hasData } = useFetch<Book[]>(null);
  //replaced with useFetch
  //const [loading, setLoading] = useState(false);
  //const [books, setBooks] = useState<Book[]>([]);
  //const [hasResult, setHasResult] = useState(false);
  //const [booksCount, setBooksCount] = useState(null);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };
  //const encodedBookName = encodeURIComponent(bookName);
  //const url = `https://openlibrary.org/search.json?q=${encodedBookName}`;

  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFetchUri(`https://openlibrary.org/search.json?q=${encodedBookName}`);
    //setLoading(true);
    //const response = await fetch(url);
    //const data = await response.json(); 
    //setLoading(false);
    //window.console.log(data);
    //setBooksCount(data.numFound);
    //setHasResult(true);  
    //setBooks(data.docs); //set to aray with type Book[]
  };
  const encodedBookName = encodeURIComponent(bookName);
  const { data, statusloading, hasData, books } = useFetch<SearchResponse>(fetchUri);
  console.log(books)

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
      {statusloading ? <div>Loading ...</div> : ""}
      {hasData ? <div>Found {data?.numFound} books</div> : ""}
      <div><BookList books={books} /></div>
    </div>
  );
}

export default App;
