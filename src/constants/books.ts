export interface Book {
    title: string;
    author: string;
    category: string;
    rating: number;
    status: "Completed" | "Reading" | "Wishlist";
    desc: string;
    quote: string;
    img: string;
}

export const BOOKS_CATEGORIES = [
    "All",
    "Technical",
    "Psychology",
    "Philosophy",
    "Fiction",
];

export const BOOKS_DATA: Book[] = [
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        category: "Technical",
        rating: 5,
        status: "Completed",
        desc: "A cornerstone of software engineering wisdom. This book taught me that being a programmer is about more than just code; it's about craftsmanship, responsibility, and continuous learning.",
        quote: "Don't live with broken windows. Fix each one as soon as it is discovered.",
        img: "https://picsum.photos/seed/programming-book/400/600",
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technical",
        rating: 5,
        status: "Completed",
        desc: "Focuses on the art of writing code that is readable, maintainable, and elegant. It provides a set of practices for producing high-quality software.",
        quote: "The only way to go fast, is to go well.",
        img: "https://picsum.photos/seed/clean-code-book/400/600",
    },
    {
        title: "Deep Work",
        author: "Cal Newport",
        category: "Psychology",
        rating: 4,
        status: "Completed",
        desc: "Transformed how I approach my work day, emphasizing the importance of long periods of uninterrupted focus for complex tasks in an increasingly distracted world.",
        quote: "Who you are, what you think, feel, and do, what you love—is the sum of what you focus on.",
        img: "https://picsum.photos/seed/focus-book/400/600",
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Psychology",
        rating: 5,
        status: "Completed",
        desc: "Provided a practical framework for making small, incremental changes that lead to remarkable results over time. It's about systems, not just goals.",
        quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
        img: "https://picsum.photos/seed/habits-book/400/600",
    },
    {
        title: "The Mythical Man-Month",
        author: "Fred Brooks",
        category: "Technical",
        rating: 4,
        status: "Reading",
        desc: "Classic essays on software engineering and project management. Even decades later, the insights into team dynamics and complexity remain incredibly relevant.",
        quote: "Adding manpower to a late software project makes it later.",
        img: "https://picsum.photos/seed/software-management/400/600",
    },
    {
        title: "Meditations",
        author: "Marcus Aurelius",
        category: "Philosophy",
        rating: 5,
        status: "Completed",
        desc: "A series of personal writings by the Roman Emperor, offering stoic philosophy on how to live a virtuous and meaningful life.",
        quote: "The happiness of your life depends upon the quality of your thoughts.",
        img: "https://picsum.photos/seed/stoic-philosophy/400/600",
    },
];
