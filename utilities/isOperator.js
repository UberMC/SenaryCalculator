const regex = /[*+-\/]/g;

export default (char) => {
    return char.match(regex)
}