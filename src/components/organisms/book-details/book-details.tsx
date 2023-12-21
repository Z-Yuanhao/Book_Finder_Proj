import { LoaderFunction, useLoaderData } from "react-router-dom";
import { BookData } from ".";

const bookLoader: LoaderFunction = async ({
  params,
}): Promise<{ book: BookData | null }> => {
  const fetchUri = `https://openlibrary.org/api/books?bibkeys=ISBN:${params.isbn}&jscmd=details&format=json`;
  const response = await fetch(fetchUri);
  if (!response.ok) {
    return { book: null };
  }
  const json = await response.json();
  const keys = Object.keys(json);
  const isbn = keys[0];
  const book = json[isbn];

  window.console.log("Book details", book);
  return { book };
};

const BookDetails = () => {
  const { book } = useLoaderData() as { book: BookData };

  if (book) {
    window.console.log(book);
    const coverId = book.details.covers ? book.details.covers[0] : null;
    let coverImage = <></>;
    window.console.log("Cover image: ", coverId);
    if (coverId) {
      const encodedCoverImg = encodeURIComponent(coverId);
      const coverImageUrl = `https://covers.openlibrary.org/b/id/${encodedCoverImg}-M.jpg`;
      window.console.log("Cover image url: ", coverImageUrl);
      coverImage = (
        <img
          src={coverImageUrl}
          alt={book.details.title}
          className="h-full"
        />
      );
    }
    let authors: React.ReactElement | null = null;
    if (book.details.authors) {
      authors = (
        <>
          {book.details.authors.map((author, index) => (
            <div key={index}>{author.name}</div>
          ))}
        </>
      );
    }
    return (
      <div className="flex">
        <div style={{ margin: '0 30px 0 0' }}>{coverImage}</div>
        <div className="flex flex-col text-left pl-4s">
          <div className="text-2xl font-bold">{book.details.title}</div>
          <div>Author(s):{authors}</div>
          <div>Publisher: {book.details.publishers}</div>
          <div>Publish date: {book.details.publish_date}</div>
        </div>
      </div>
    );
  }
  return <></>;
};

export { BookDetails, bookLoader };