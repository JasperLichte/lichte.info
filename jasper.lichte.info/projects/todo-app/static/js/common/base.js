window._$ = function(selector) {
    var allNodes = document.querySelectorAll(selector);
    if (allNodes.length > 1) {
        return allNodes;
    }
    return document.querySelector(selector);
}