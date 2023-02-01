// ==UserScript==
// @name         记住Google搜索语言设置
// @namespace    https://github.com/laisc7301/remember-google-language
// @version      0.1
// @description  记住Google搜索语言设置，不用每次设置语言
// @author       睿虎
// @match        https://www.google.com/search*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @run-at       document-start
// @homepage     https://laisc7301.blogspot.com/
// ==/UserScript==

(function() {
    var css = `
    #resetLanguage{
    color:dimgray;
    }
    #resetLanguage:hover{
    color:black;
    }
    #resetLanguage:active{
    color:dodgerblue;
    }

    `;
    GM_addStyle(css);

    var url = unsafeWindow.location.href;
    //url="https://www.google.com/search?q=tensorflow&lr=lang_zh-CN|lang_zh-TW&newwin";

    //url="https://www.google.com/search?q=tensorflow&lr=&";


    var regex = /lr=.*?&|lr=\S{0,}(?<!&)$/;
    var url2 = url.match(regex);
    if(url2 != null){
        GM_setValue("googleLanguage", url2);
    }else if(GM_getValue("googleLanguage", "none")!="none"){
        unsafeWindow.location.href = unsafeWindow.location.href + '&' + GM_getValue("googleLanguage", "none");
    }

    window.onload=function(){


        if(url2 != null){
            setTimeout(function() {
                var resetLanguage = document.createElement('a');
                resetLanguage.href = "#";
                resetLanguage.innerHTML = '重置语言';
                resetLanguage.className = "resetLanguage";
                resetLanguage.id="resetLanguage";
                resetLanguage.addEventListener('click', function() {
                    GM_deleteValue("googleLanguage");
                    var myurl = unsafeWindow.location.href;
                    var regex2 = /&lr=.*?&$|lr=.*?&|&lr=\S{0,}(?<!&)$/;
                    var myurl2 = myurl.replace(regex2, "");
                    unsafeWindow.location.href = myurl2;

                });

                unsafeWindow.document.getElementById("tn_1").appendChild(resetLanguage);
            }, 500);
        }
    }

})();















