// chrome.contextMenus.create({"title": '当前页地址生成二维码', 'contexts': ['page'], "onclick": clickOnPage});
// chrome.contextMenus.create({"title": "所选图片生成二维码", "type": "normal", "contexts": ["image"], "onclick": clickOnImage});
// chrome.contextMenus.create({"title": "解析该二维码图片", "type": "normal", "contexts": ["image"], "onclick": clickGetImage});
// chrome.contextMenus.create({"title": '当前链接地址生成二维码', 'contexts': ['link'], "onclick": clickOnLink});
chrome.contextMenus.create({"title": '所选文字生成条形码', 'contexts': ['selection'], "onclick": clickOnSelection});
function clickOnPage() {
    chrome.tabs.getSelected(function(tab) {
        var url = encodeURI(tab.url);
        var message = {'type': 'page', 'url': url};
        chrome.tabs.sendRequest(tab.id, message);
    })
}
function clickOnImage(info, tab) {
    var url = info.srcUrl;
    url = encodeURI(url);
    var message = {'type': 'image', 'url': url};
    chrome.tabs.sendRequest(tab.id, message);
}
function clickGetImage(info, tab) {
    var url = info.srcUrl;
    url = encodeURI(url);
    var message = {'type': 'getimage', 'url': url};
    chrome.tabs.sendRequest(tab.id, message);
}
function clickOnLink(info, tab) {
    var url = info.linkUrl;
    
    url = encodeURI(url);
    var message = {'type': 'link', 'url': url};
    chrome.tabs.sendRequest(tab.id, message);
}
function clickOnSelection(info, tab) {
    var url = info.selectionText;
    var message = {'type': 'selection', 'url': url};
    chrome.tabs.sendRequest(tab.id, message);
}