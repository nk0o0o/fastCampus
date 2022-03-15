
function openPopup(url, name, options){
    var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");  //Post 방식
    form.setAttribute("action", url); //요청 보낼 주소
    form.setAttribute("target", name); //targetName

    document.body.appendChild(form);
    window.open('', name, options);
    form.submit()

    document.body.removeChild(form);
}