export function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    
    return `${month}/${day}/${year}`;
}

export const nextBelt = (currentBelt: string): string => {
    if (currentBelt === "white") return "yellow"
    if (currentBelt === "yellow") return "orange"
    if (currentBelt === "orange") return "purple"
    if (currentBelt === "purple") return "blue"
    if (currentBelt === "blue") return "green"
    if (currentBelt === "green") return "brown"
    if (currentBelt === "brown") return "red"
    if (currentBelt === "red") return "black"
    return "black"
}

export const prevBelt = (currentBelt: string): string => {
    if (currentBelt === "black") return "red"
    if (currentBelt === "red") return "brown"
    if (currentBelt === "brown") return "green"
    if (currentBelt === "green") return "blue"
    if (currentBelt === "blue") return "purple"
    if (currentBelt === "purple") return "orange"
    if (currentBelt === "orange") return "yellow"
    if (currentBelt === "yellow") return "white"
    return "white"
}