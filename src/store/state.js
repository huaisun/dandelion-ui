const state = {
    regex: {
        domain: /^[A-Za-z]{3,12}$/,
        email: /^\s*\w+(?:\.?[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/,
    },
    domain: '',
    user: {
        domain: '',
    }
}

export default state;