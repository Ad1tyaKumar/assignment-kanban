export const cmpTitle = (a: Ticket, b: Ticket): number => {
    return a.title.localeCompare(b.title);
}

export const cmpPriority = (a: Ticket, b: Ticket): number => {
    return b.priority - a.priority;
}