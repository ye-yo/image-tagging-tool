import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const globalStyles = createGlobalStyle`
     ${reset};
     *{
         box-sizing:border-box;
     }

     body{
         font-size: 14px;
     }

     .App{
        max-width: 1000px;
        margin: 0 auto;
     }
 `;
export default globalStyles;
