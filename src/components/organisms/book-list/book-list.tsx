import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Book } from "../book-details";
import { Link } from "react-router-dom";

const renderBookRow = ({
    index,
    style,
    data,
}: ListChildComponentProps<Book[]>) => {
    const isEvenRow = index % 2 === 0;
    const className = `flex items-center px-4 overflow-hidden ${isEvenRow ? 'bg-gray-100' : 'bg-white'}`;

    const book = data[index];
    let isbn = null;
    if (book.isbn) { 
        isbn = book.isbn[0];
    }
    const encodedCoverImg = encodeURIComponent(book.cover_i);
    const coverImageUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${encodedCoverImg}-S.jpg` : '';
    window.console.log(`Book ${index}`, book);
    const title = book.title


    return (
        <div className={className} style={style}>
            <div className="w-14 h-16 flex justify-center items-center">
                <img src={coverImageUrl} alt={title} /> 
            </div>
            <div className="flex grow justify-center">
                <Link to={`books/${isbn}`}>
                    <div className="font-bold">{title}</div>
                </Link>
            </div>
        </div>
    );
};
interface BookListProps {
    books: Book[];
}
const BookList = ({ books }: BookListProps) => {
    window.console.log("Book list", books);
    if (books) {
        return (
            <FixedSizeList
                className="border border-slate-300"
                height={250}
                itemCount={books.length}
                itemSize={65}
                width={600}
                itemData={books}
            >
                {/* 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
                {renderBookRow}
            </FixedSizeList >
        );
    }
    return <></>;
};

export { type Book, type BookListProps, BookList };