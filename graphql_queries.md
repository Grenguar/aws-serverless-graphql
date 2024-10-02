## Examples

Book 1
```grapqhql
addBook(input: {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    yearPublished: 1967 
}) {
    id
    title
}

addBook(input: {
    title: "Jonathan Livingston Seagull",
    author: "Richard Bach",
    yearPublished: 1979 ## mistake (should be 1970)
    isbn: "978-1-4767-9331-3"
}) {
    id
    title
}

mutation UpdateMutation {
    updateBook(input: {
        id: "<RICHARD BACH BOOK>",
        yearPublished: "1970"
    }) {
        title
        isbn
        author
    }
}

mutation RegisterCustomer {
    registerCustomer(input: {
        fullName: "Leopold Richter",
        email: "Leopold.r@example.com",
    }) {
        eventStatus
    }
}
```