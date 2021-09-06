//token 가져오기
function  getToken(){
    return localStorage.getItem('token');
}

//token으로 user 정보 가져오기
async function getUserByToken(token){
    try {
        const res = await axios.get('https://api.marktube.tv/v1/me',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data;
    } catch(error){
        console.log('getUserByToken error', error);
        return null;
    }
}

//책정보 받아오기
async function getBook(bookId){
    const token =getToken();
    if(token === null){
        location.assign('./login.html');
        return null;
    }
    try {
        const res = await axios.get(`https://api.marktube.tv/v1/book/${bookId}`,{
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error){
        console.log('get book error', error);
        return null;
    }
}

//책그리기
function render(book){
    const bookInfo = document.querySelectorAll('.bookInfo');
    bookInfo[0].value = book.title;
    bookInfo[1].value = book.message;
    bookInfo[2].value = book.author;
    bookInfo[3].value = book.url;   
}
//저장 버튼 이벤트 연결
function bindUpdateBtn(){
    const form = document.querySelector('#form-edit-book');
    form.addEventListener('submit', update);
}
//취소 버튼 이벤트 연결
function bindCancleBtn(){
    const cancelBtnElement = document.querySelector('#btn-cancel');
    cancelBtnElement.addEventListener('click', cancel);
}
function cancel(event) {
    event.preventDefault();
    event.stopPropagation();   
    const urlBookId = new URL(location.href).search;
    console.log(urlBookId);
    location.assign(`./book.html${urlBookId}`);
}
//수정된 책정보 저장
async function update(event){
    event.preventDefault();
    event.stopPropagation();
    const bookInfo = document.querySelectorAll('.bookInfo');
    let book = {};
    for(let i=0; i< bookInfo.length; i++){
        book = {
            title: bookInfo[0].value,
            message: bookInfo[1].value,
            author: bookInfo[2].value,
            url: bookInfo[3].value
        };
    }
    //유효성 검사
    if(book.title ===''||book.message ===''||book.author ===''||book.url ===''){
        alert('값을 입력하세요');
        return;
    }
    const token = getToken();
    if(token === null){
        location.assign('../login.html');
        return;
    }
    const editBookId = new URL(location.href).searchParams.get('id');
    try {
        await axios.patch(`https://api.marktube.tv/v1/book/${editBookId}`,{
            title : book.title,
            message : book.message,
            author : book.author,
            url : book.url
        }, {
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        location.assign('./index.html');
    } catch(error){
        console.log('save error', error);
        alert('책 추가 실패')
        return null;
    }    
    event.target.classList.add('was-validated');//부트스트랩 문제없는 버튼 ui(?)
};


async function main(){
    //버튼에 이벤트 연결
    bindUpdateBtn();
    bindCancleBtn();
    //브라우저에서 id가져오기
    const bookId = new URL(location.href).searchParams.get('id');
    //토큰 체크
    const token = getToken();
    if(token === null){
        location.assign('./login.html')
        return
    }
    //토클으로 서버에서 나의 정보 받아오기
    const user = await getUserByToken(token); //await 함수 있으니깐 main()도 async
    if(user === null){
        console.log('user null')
        localStorage.clear();
        location.assign('./login.html');
        return;
    }
    //책을 서버에서 받아오기
    const book = await getBook(bookId);
    if(book === null){
        alert('서버에서 책 가져오기 실패');
        return;
    }
    //받아온 책을 그리기
    render(book);
}
document.addEventListener('DOMContentLoaded', main);