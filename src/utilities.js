const HtmlStrip = function(htmlString) {
    let d = document.createElement("div");
    d.innerHTML = htmlString;
    return d.innerText;
}

export {HtmlStrip}