export default (name) => {
    return name.toLowerCase().replace(/[^a-zA-Z0-9-_]/g, '');
}