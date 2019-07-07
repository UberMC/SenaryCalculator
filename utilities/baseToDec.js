const regex = /[*+-\/]/g;

export default (number, base) => {
    return Number.parseInt(number, base)
}