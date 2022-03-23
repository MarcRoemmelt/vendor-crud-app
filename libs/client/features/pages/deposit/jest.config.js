module.exports = {
    displayName: 'client-features-pages-deposit',
    preset: '../../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../../coverage/libs/client/features/pages/deposit',
};
