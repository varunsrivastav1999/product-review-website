export const getRandomColor = (): string => {
    return `#${Math.random().toString(16).substr(-6)}`
}
