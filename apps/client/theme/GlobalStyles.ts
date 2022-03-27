import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Dosis';
        src: local('Dosis-SemiBold'), url('/fonts/Dosis-SemiBold.ttf') format('ttf');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'Dosis';
        src: local('Dosis-Light'), url('/fonts/Dosis-Light.ttf') format('ttf');
        font-weight: 200;
        font-style: normal;
    }

    html {
        -webkit-text-size-adjust: 100%;
        font-family: Dosis, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
        Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        line-height: 1.5;
        tab-size: 4;
        scroll-behavior: smooth;
    }
    body {
        font-family: inherit;
        line-height: inherit;
        margin: 0;
    }
    h1,
    h2,
    p,
    pre {
        margin: 0;
    }
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
    }
    h1,
    h2 {
        font-size: inherit;
        font-weight: inherit;
    }
    a {
        color: inherit;
        text-decoration: inherit;
    }
    pre {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    }
    svg {
        display: block;
        shape-rendering: auto;
        text-rendering: optimizeLegibility;
    }
`;