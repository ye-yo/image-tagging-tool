import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const globalStyles = createGlobalStyle`
     ${reset};
     *{
         box-sizing:border-box;
     }

     body{
         font-size: 14px;
         font-family: Georgia, "Times New Roman", serif;
         color: #2d2d2d;
     }

     button{
         cursor: pointer;
     }

     .App{
        max-width: 1000px;
        margin: 0 auto;
     }
 `;
export default globalStyles;
