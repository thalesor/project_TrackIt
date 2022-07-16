import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
input, button, textarea {
    border: none;
}

* 
{
    font-family: 'Lexend Deca', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body
{
    height: 100vh;
    width: 100%;
}

.error {
    background-color: red;
}

`

export default GlobalStyle;