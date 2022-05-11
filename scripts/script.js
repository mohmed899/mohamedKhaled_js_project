var ProductsList = new Array();



console.log("im here ")
initMainPage();
// handel cookes with searsh bar

function saveSTextCookie() {
    var searshInputText = document.getElementById("searsh_text")
    // console.log("v= ", searshInputText.value)
    if (searshInputText.value != "") {
        var temp = getCookie("UserSearsh");
        var temp = temp + '*' + searshInputText.value
        document.cookie = "UserSearsh=" + temp + ";expires=21/11/2022";
        console.log(searshInputText.value)
        searshproduct(searshInputText.value);
    }
}

function searshproduct(params) {

    var product = '', foundProduct = 0;
    var MainBody = document.getElementById("super_con")
    for (var i = 0; i < ProductsList.length; i++) {
        if (ProductsList[i]["pName"] == params && ProductsList[i]["pType"] != '3D') {
            foundProduct++;
            product += '<div class="card wow bounceInUp"> <img class="product_img" src="' + ProductsList[i]["pImage"] + '" alt="Image"  /><div ><h4 class="product_title">' + ProductsList[i]["pName"] + '<h4><p class="product_des">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p><p class="product_price">' + ProductsList[i]["pPrice"] + '</p></div></div>'
        }
        else if (ProductsList[i]["pName"] == params && ProductsList[i]["pType"] == '3D') {
            foundProduct++;
            product += '<div class="card wow bounceInUp">  <model-viewer class="ss" src="' + ProductsList[i]["pImage"] + '" ar ar-modes="webxr scene-viewer quick-look"  camera-controls></model-viewer>      <div ><h4 class="product_title">' + ProductsList[i]["pName"] + '<h4><p class="product_des">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p><p class="product_price">' + ProductsList[i]["pPrice"] + '</p></div></div>'


        }
    }
    if (foundProduct > 0) {
        MainBody.innerHTML = product;
        new WOW().init();
    }
    else {
        MainBody.innerHTML = '<div class="wow bounceInUp style="width: 500px; height: 500px;"> <img src="./imgs/sold.png" style="width: 100%; height: 100%;"></div>'
        new WOW().init();
    }
    console.log(foundProduct)
}


function loadSearchSuggestion() {
    var searshCOokieList = document.getElementById("searsh_text_List")
    searshCOokieList.innerHTML = '';
    if (getCookie("UserSearsh") != '') {
        var list = getCookie("UserSearsh").split('*');
        list = [...new Set(list)]
        for (let i = 1; i < list.length; i++) {
            console.log(list[i])
            var e = document.createElement("option")
            e.value = list[i];
            searshCOokieList.appendChild(e)
        }
    }

}

// handel getting data 

var isDataReady = 0; //

function getProductData(params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ProductsList = JSON.parse(xhr.response)
                if (params == "women")
                    isDataReady = 1;
            }
        }
    }
    xhr.open("GET", "./database/products.json")
    xhr.send("")
}

function loadDataWithDelay(params) {

    if (isDataReady == 0) {
        //display loading anmie
        document.getElementById("super_con").innerHTML = ' <div id="con" class="containerr"> <div class="dot dot1"></div> <div class="dot dot2"></div> <div class="dot dot3"></div> </div>';
        // make delay with retriving data
        setTimeout(getProductData, 5000, params);
        // keep display the load till data become avalible 
        var inter = setInterval(() => {
            console.log(isDataReady)
            if (isDataReady == 1) {
                document.getElementById("con").remove()
                insertOnBody(params);
                window.clearInterval(inter)
            }
        }, 10);
    }
    else
        insertOnBody(params);


}

function loadData(params) {
    getProductData(params);  //get data from server 
    setTimeout(() => {  // make delay 
        insertOnBody(params)
    }, 500);
}



// handle slider 
var indx = 1;
var sImg = document.getElementById("imgId")
console.log(sImg)
function fMoveImg(params) {
    if (params == "left") {
        if (indx != 0)
            indx = (--indx % 4)
    }
    else
        indx = (++indx % 4)
    sImg.src = './imgs/slider/' + indx + '.jpg'
}

function slideShow() {
    setInterval(() => {
        indx = (++indx % 4)
        sImg.src = './imgs/slider/' + indx + '.jpg'
    }, 1500);
}




//---------------------Helper_function---------------------------

function getCookie(params) {
    var cookie = document.cookie;
    var arr = cookie.split("; ")
    var subArr, isDataReadye = 0, a = '';
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
        // console.log("c =", c);
        subArr = arr[i].split("=");
        if (subArr[0] == params) {
            a = subArr[1]
            console.log("test we found it ", a)
            return a;
        }
    }
    return a;
}

function insertOnBody(type) {
    var body = document.getElementById("super_con")
    body.innerHTML = "";
    for (var i = 0; i < ProductsList.length; i++) {


        if (ProductsList[i]["pType"] == type && type != '3D') {
            body.innerHTML +=
                '<div class="card wow bounceInUp"> <img class="product_img" src="' + ProductsList[i]["pImage"] + '" alt="Image"  /><div ><h4 class="product_title">' + ProductsList[i]["pName"] + '<h4><p class="product_des">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p><p class="product_price">' + ProductsList[i]["pPrice"] + '</p></div></div>'
        }
        else if (ProductsList[i]["pType"] == '3D' && type == '3D') {
            body.innerHTML +=
                '<div class="card wow bounceInUp">  <model-viewer class="ss" src="' + ProductsList[i]["pImage"] + '" ar ar-modes="webxr scene-viewer quick-look"  camera-controls></model-viewer>    <div ><h4 class="product_title">' + ProductsList[i]["pName"] + '<h4><p class="product_des">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p><p class="product_price">' + ProductsList[i]["pPrice"] + '</p></div></div>'

        }
        new WOW().init();
    }
}

function initMainPage(params) {
    slideShow()
    loadData('men')

}

function goAtTop() {
}
var upBtn = document.getElementById("up_btn");
window.onscroll = function (params) {
    if (window.scrollY > 1000) {

        upBtn.style.display = 'flex';
        // new WOW().init();
    }
    else
        upBtn.style.display = 'none';
    console.log(window.scrollY)
}