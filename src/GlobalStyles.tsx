import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    background-color: #0104BB;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  button {
    cursor: pointer;
  }

  a:focus {
    text-decoration: none;
  }
`;

export default GlobalStyle;
