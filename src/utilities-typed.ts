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
/*
const inView = function(el,updateCallback) {
    const element = el ;
    const interSector = new IntersectionObserver((changes) => {
        let goodToChange = changes.find(e => e.isIntersecting && e.target == element)
        if(!goodToChange) {
            return false; 
        }
        updateCallback(); 
        disconnect(); 
    }); 
    const disconnect() => {
        interSector.disconnect(); 
    }
    return {
        disconnect: disconnect(); 
    }
    
}
*/

export {/*inView, */arraySplit, HtmlStrip,truncateString}
