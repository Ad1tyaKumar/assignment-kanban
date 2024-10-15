interface Ticket {
    id: string;
    title: string;
    status: "backlog" | "todo" | "in progress" | "done" | "cancelled";
    priority: number;
    userId: string;
    tag: string[];
}

interface User {
    id: string;
    name: string;
}

interface Data {
    tickets: Ticket[];
    users: User[];
}