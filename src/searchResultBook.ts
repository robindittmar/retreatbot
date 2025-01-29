export interface SearchResultBook {
    key: string;
    title: string;
    author_name: string[];
    id_goodreads: string[];
    id_amazon: string[];
    [key: string]: any;
}

export interface Book {
    title: string;
    description: string | { type: string; value: string };
}

export async function searchBook(title: string, author?: string): Promise<any> {
    let result = await fetch(
        "https://openlibrary.org/search?" +
            new URLSearchParams({ q: title }).toString(),
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        },
    );
    if (result.ok) {
        return result.json();
    }

    return {};
}

export async function getBook(key: string): Promise<Book> {
    let result = await fetch("https://openlibrary.org" + key, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    if (result.ok) {
        return result.json();
    }

    return {
        title: "",
        description: "",
    };
}
