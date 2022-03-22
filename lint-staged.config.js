module.exports = {
    'package.json': ['fixpack'],
    '{apps,libs,tools}/**/*.{ts,tsx,js,jsx,css,scss}': () => {
        return [
            'nx format:write',
            `nx affected:lint --fix`,
            `nx affected:test`,
        ];
    },
};
