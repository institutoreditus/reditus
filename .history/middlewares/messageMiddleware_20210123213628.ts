import * as messages from "../strings/pt/messages.json";
// import * as messages from "../strings/${locale}/messages.json";

const defaultLocale = "pt";

 function getMessage(key: string) {
    var msg = key
    

    if (msg){
        return console.log(msg)
    }
    else {
        console.log(`Could not look up message with key ${msg}`)
    }
}

export default getMessage;