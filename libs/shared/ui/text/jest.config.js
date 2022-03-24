module.exports = {
    displayName: 'shared-ui-text',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../coverage/libs/shared/ui/text',
};
