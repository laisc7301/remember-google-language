// ==UserScript==
// @name         记住Google搜索语言设置
// @namespace    https://github.com/laisc7301/remember-google-language
// @version      2.2
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
// @license      Apache License 2.0
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
    var url2 = null;
    //url="https://www.google.com/search?q=tensorflow&lr=lang_zh-CN|lang_zh-TW&newwin";

    //url="https://www.google.com/search?q=tensorflow&lr=&";

    var regex21 = /&lr=$|&lr=&/;
    var url11 = url.match(regex21);
    if(url11 != null){
        GM_deleteValue("googleLanguage");
        var regex22 = /&lr=&$|&lr=$|lr=&|^lr=$/;
        var url12=url.replace(regex22,"");
        unsafeWindow.location.href = url12;

    }else{




        var regex = /lr=.*?&|lr=\S{0,}(?<!&)$/;
        url2 = url.match(regex);
        if(url2 != null){
            var regex11 = /&$/;
            var url3 = url2.toString().replace(regex11, "");
            GM_setValue("googleLanguage", url3);
        }else if(GM_getValue("googleLanguage", "none")!="none"){
            unsafeWindow.location.href = unsafeWindow.location.href + '&' + GM_getValue("googleLanguage", "none");
        }

        window.onload=function(){



            var myobj2 = unsafeWindow.document.getElementById("hdtb-tls").parentElement;
            var myhtml11 = myobj2.innerHTML;

            var myClassName = myobj2.lastElementChild.className;

            myhtml11 = myhtml11 + `&nbsp;&nbsp;&nbsp;&nbsp;<div class="${myClassName}" id="languageToChinese">中文结果</div>`;
            myobj2.innerHTML = myhtml11;
            var myobj3 = unsafeWindow.document.getElementById("languageToChinese");

            myobj3.addEventListener('click', function() {

                var url22 = unsafeWindow.location.href;
                var regex2 = /&lr=.*?&$|lr=.*?&|&lr=\S{0,}(?<!&)$/;
                var url23 = url22.replace(regex2, "");
                url23 = url23 + "&lr=lang_zh-CN|lang_zh-TW";
                unsafeWindow.location.href = url23;
            });







            if(url2 != null){
                var waitload = setInterval(function() {
                    var myobj = unsafeWindow.document.getElementById("tn_1");
                    var myhtml = myobj.innerHTML;
                    if(myhtml != ""){
                        var myhtml02 = myhtml;
                        var regex01 = /href="\/search\?.*?">/g;
                        var myhtml2 = myhtml.match(regex01);
                        for (var myurlsub in myhtml2)
                        {
                            var myurl01 = myhtml2[myurlsub];
                            var regex02 = /lr=.*?&|lr=\S{0,}(?<!&)$/;
                            var myurltest = myurl01.match(regex02);
                            if (myurltest == null){
                                if(myurl01.match(regex03)!=null){
                                    var regex03 = /" /;
                                    var myurl03 = myurl01.replace(regex03, "&lr=\" ");
                                    myhtml02 = myhtml02.replace(myurl01,myurl03);
                                }else{
                                    var regex04 = /">$/;
                                    var myurl04 = myurl01.replace(regex04, "&lr=\">");
                                    myhtml02 = myhtml02.replace(myurl01,myurl04);
                                }
                            }

                        }
                        myobj.innerHTML = myhtml02;



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

                        myobj.appendChild(resetLanguage);
                        clearInterval(waitload);
                    }

                }, 100);
            }
        }
    }

})();
