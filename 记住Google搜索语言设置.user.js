// ==UserScript==
// @name         记住Google搜索语言设置
// @namespace    https://github.com/laisc7301/remember-google-language
// @version      2.5
// @description  自动记住Google搜索的结果语言的设置，不用每次设置语言
// @author       睿虎
// @match        https://www.google.com/search*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @run-at       document-start
// @homepage     https://laisc7301.github.io/blog/
// @license      Apache License 2.0
// ==/UserScript==

(function() {

    var url = unsafeWindow.location.href;

    //url="https://www.google.com/search?q=tensorflow&lr=lang_zh-CN|lang_zh-TW&newwin";
    //url="https://www.google.com/search?q=tensorflow&lr=&";
    //url="https://www.google.com/search?q=tensorflow";

    //---------------------------------------1------------------------------------------------
    //第一部分：检测语言设置，保存语言设置，应用设置


    var regex11 = /&lr=\S{0,}?&|&lr=\S{0,}?$|\?lr=\S{0,}?&|\?lr=\S{0,}/;
    var url11 = url.match(regex11);//获取url中的语言设置
    //url11="lr=lang_zh-CN|lang_zh-TW";

    if(url11!=null){//若url中的语言设置存在，则保存
        var regex12 = /&|\?/g;
        var url12 = url11.toString().replace(regex12,"");
        if(url12!="lr="){
            GM_setValue("googleLanguage", url12);//保存语言设置
        }else{//如果语言设置为空，则清除设置
            GM_deleteValue("googleLanguage");
            var regex13 = /&lr=&|&lr=|lr=&|lr=/g;
            var url13 = unsafeWindow.location.href;
            var url14 = url13.toString().replace(regex13,"&");
            unsafeWindow.location.href = url14;
        }
    }else{
        var set1 = GM_getValue("googleLanguage","none");
        if(set1!="none"){//如果存在设置，则自动跳转到设置的语言
            unsafeWindow.location.href += "&" + set1;
        }

    }

    //--------------------2-----------------------
    //第二部分：设置【清除】按钮的链接

    var clean1 = null;

    var waitload = setInterval(function() {
        clean1 = document.getElementsByClassName("rZBQ0c")[0];
        if(clean1!=undefined){
            clean1.href += "&lr=";
            clearInterval(waitload);
        };
        //alert(123);

        var url21 = unsafeWindow.location.href;
        var regex21 = /&lr=\S{0,}?&|&lr=\S{0,}?$|\?lr=\S{0,}?&|\?lr=\S{0,}/;
        var url22 = url21.match(regex21);//获取url中的语言设置
        if(url22==null){
            clearInterval(waitload);
        }else{
            var regex22 = /&|\?/g;
            var url23 = url22.toString().replace(regex22,"");
            if(url23=="lr="){
                clearInterval(waitload);
            }
        }



    }, 100);





})();