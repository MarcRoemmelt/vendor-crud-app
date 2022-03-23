module.exports = {
    displayName: 'client-ui-ic-button',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../coverage/libs/client/ui/ic-button',
};
