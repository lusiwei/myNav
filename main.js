

// 键盘每一行用一个数组表示，然后整个键盘用hash表示
var keys = {
    0: ['~',1, 2, 3, 4, 5, 6, 7, 8, 9, 0,'-', '+', 'delete'], //length=14
    1: ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'],    //length=14
    2: ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'enter'],
    3: ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shiftr'],
    4: ['fn', 'ctrl', 'option', 'command', 'space', 'command', 'option', 'direction'],
    length: 5
}
var hash = {
    q: 'qq.com',
    w: 'weibo.com',
    t: 'tudou.com',
    y: 'youku.com',
    i: 'iqiyi.com',
    d: 'douban.com',
    z: 'zhihu.com',
    m: 'meituan.com',
    j: 'jirengu.com',
    x: 'xiedaimala.com',
    b: 'baidu.com',
    a: 'alibaba.com',
    v: 'visualgo.net/',
    l: 'letv.com',
    s: 'segmentfault.com',
    h: 'huya.com',
    g: 'google.com',
    u: 'ubuntu.com',
    o: 'opera.com',
    f: 'facebook.com',
}
var getLocalStorage = JSON.parse(localStorage.getItem('user_hash') || null)   //取出hash,并从字符串转换成对象
if (getLocalStorage) {
    hash = getLocalStorage
}


for (var keys_index = 0; keys_index < keys.length; keys_index++) {
    //生成div
    var div = document.createElement('div')
    var wrapper = document.getElementById('wrapper')
    wrapper.appendChild(div)
    for (var row_index = 0; row_index < keys[keys_index].length; row_index++) {
        // 生成kbd标签
        var kbd = document.createElement('kbd')
        var key_value = keys[keys_index][row_index]
        div.appendChild(kbd)
        kbd.textContent = key_value
        kbd.id = 'kbd_' + kbd.textContent
        // 生成img
        var img = document.createElement('img')
        kbd.appendChild(img)
        if (hash[key_value]) {
            img.src = 'http://' + hash[key_value] + '/favicon.ico'
        } else {
            img.src = './favicon.ico'
        }
        img.onerror = function (xxx) {
            xxx.target.src = './favicon.ico'
        }
        // 生成编辑和删除按钮
        var btn_E = document.createElement('button')
        var btn_D = document.createElement('button')
        kbd.appendChild(btn_E)
        kbd.appendChild(btn_D)
        btn_E.textContent = 'E'
        btn_D.textContent = 'D'
        btn_E.id = 'E_' + key_value
        btn_D.id = 'D_' + key_value
        // 编辑按钮
        btn_E.onclick = function (xx) {
            var user_input = prompt('请输入你要自定义的网址')
            console.log(xx)
            var click_key_id = xx.target.id
            var key = click_key_id.substring(2)
            hash[key] = user_input
            // 编辑后判断icon地址
            console.log("哈哈哈")
            // 之前这里写成了btn_E.previousSibling,导致每次修改网址后都要刷新icon才能出来
            var img2 = xx.target.previousSibling
            if (hash[key]) {
                img2.src = 'http://' + hash[key] + '/favicon.ico'
            } else {
                img2.src = './favicon.ico'
            }
            // console.log(img2)
            img2.onerror = function (xxx) {
                xxx.target.src = './favicon.ico'
            }
            //将改变后的hash存到localstorage防止用户刷新后失效
            // JSON.stringify将hash对象转换为字符串
            localStorage.setItem('user_hash', JSON.stringify(hash))
        }
        // 删除按钮
        btn_D.onclick = function (xx) {
            var click_key_id = xx.target.id
            var key = click_key_id.substring(2)
            delete hash[key]
            // 点击删除按钮后icon变成默认
            var img3=xx.target.previousSibling.previousSibling
            // console.log(img3)
            img3.src='./favicon.ico'
            
            //将改变后的hash存到localstorage防止用户刷新后失效
            // JSON.stringify将hash对象转换为字符串
            localStorage.setItem('user_hash', JSON.stringify(hash))
        }
    }
}

// 监听得到焦点和失去焦点两个事件
var focus = false
input.onfocus = function (xx) {
    focus = true
    input.placeholder=""
}
input.onblur = function (xx) {
    focus = false
    input.placeholder="please input your words"
}

// 监听键盘输入
document.onkeypress = function (xx) {
    var getKey = xx.key
    // console.log(focus)
    if (!focus) {
        if (hash[getKey]) {
            window.open('//' + hash[getKey], '_blank')
        }
    }
}

// 百度搜索和谷歌搜索按钮
baidu.onclick = function () {
    window.open('//baidu.com/s?wd=' + input.value, '_blank')
}
google.onclick = function () {
    window.open('//google.com/search?q=' + input.value, '_blank')
}