import { useState, useEffect } from "react";
import { Book } from "components/organisms/book-list";
const useFetch = <T>(uri: string | null) => {
    const [data, setData] = useState<T | null>(null);
    const [hasData, setHasData] = useState(false);
    const [statusloading, setStatusLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        if (!uri) {
            return;
        }
        // Provide a status before we start fetching
        setStatusLoading(true);
        fetch(uri)
            .then((response) => {
                // Provide a status update when fetching finishes
                setHasData(true)
                return response.json();
            })
            .then((json) => {
                setData(json);
                setBooks(json.docs);
            })
            .catch((err) => {
                window.console.log(err);
                setHasData(false);
                setStatusLoading(false);
            })
            .finally(() => {
                setStatusLoading(false);
            });
    }, [uri]);
    return {
        data,
        statusloading,
        hasData,
        books,
        // This custom hook should also return
        // status of loading, and the status data availability
    };
};
export { useFetch };
