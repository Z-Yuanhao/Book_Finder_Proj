import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Book } from ".";
const renderBookRow = ({
    index,
    style,
    data,
}: ListChildComponentProps<Book[]>) => {
    const isEvenRow = index % 2 === 0;

    const className = `flex justify-start items-center px-4 ${isEvenRow ? 'bg-gray-100' : 'bg-white'}`;
//how to change background color????
    const book = data[index];
    const encodedCoverImg = encodeURIComponent(book.cover_i);
    const coverImageUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${encodedCoverImg}-S.jpg`: '';
    window.console.log(`Book ${index}`, book);
    const title = book.title
    // To get the book's cover image please use the "cover_i" value
    // `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    return (
        <div className={className} style={style}>
            {/* Display book's cover image and title */}
            <img src={coverImageUrl} alt="cover" />
            <div className="flex-grow flex items-center justify-center px-2">
                <div className="font-bold">{title}</div>
            </div>
        </div>
    );
};
interface BookListProps {
    books: Book[];
}
const BookList = ({ books }: BookListProps) => (
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

    </FixedSizeList>
);
export { BookList }