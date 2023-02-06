const toUpperFirstLetter = (string) => {
    const capitizedString = string.split(' ');

    for (let i = 0; i < capitizedString.length; i++) {
        capitizedString[i] = capitizedString[i].charAt(0).toUpperCase() + capitizedString[i].slice(1);
    }

    return capitizedString.join(' ');
};

module.exports = { toUpperFirstLetter };
