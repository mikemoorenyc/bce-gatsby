const HtmlStrip = (string: string) : string =>{
    if(!string) {
        return "";
    }

    return string.replace(/(<([^>]+)>)/gi, "")
    
}
const truncateString = function(str: string, num: number) : string {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}
const arraySplit = function(string:string, splitValue : any = /\r?\n/) {
    return string.split(splitValue);
}

export {arraySplit, HtmlStrip,truncateString}