export const getUserName = (fullName: string): string => {
    return `_${fullName?.toLowerCase()?.split(" ").join("_")}`
}