async function main(){
    const pageURL = location.href;
    const loginPage = "/login.html";

    if(pageURL.indexOf(loginPage) !== -1) { //로그인 페이지일때
        bindLoginBtn();
        return;
    }    
    
    checkToken(pageURL);
    checkUser();
    renderBook();
    bindSaveBtn();
    bindCancelBtn();
    bindLogoutBtn();   
}
document.addEventListener('DOMContentLoaded', main);