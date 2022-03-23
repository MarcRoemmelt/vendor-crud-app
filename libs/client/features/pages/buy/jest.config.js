module.exports = {
    displayName: 'client-features-pages-buy',
    preset: '../../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../../coverage/libs/client/features/pages/buy',
};
