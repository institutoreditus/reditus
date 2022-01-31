// import {default as messages} from "../pages/strings/pt/messages.json";
import * as Messages from "../pages/strings/pt/messages.json";

const defaultLocale = "pt";

export async function getMessage(key: string): Promise<any> {
    if (key == undefined){
        console.log(`could not look up message with key ${key}`);
        // else console.log(`Não foi possível encontrar a mensagem com a chave ${key}`);    }
    } else {
        return key;
    }

}

// const getMessage = async (key: string) => {
//     let locale = "pt"
//     try {
//       return require(`../pages/strings/${locale}/messages.json`)
//     } catch (error) {
//       console.error(error)
//       return require(`../pages/strings/${locale}/messages.json`)
//     }
//   }
  
//   export default getMessage

// console.log(getMessage("invalid_data)");

export default getMessage;
