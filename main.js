var bd=document.getElementById('bd')
var gg=document.getElementById('gg')
var input=document.getElementById('input')
bd.onclick=function (xxx){
    window.open('http://www.baidu.com/s?wd='+input.value,'_blank')
}
gg.onclick=function(xxx){
    window.open('http://www.google.com/search?q='+input.value,'_blank')
}