const pageURL = location.href;
const indexPage = "/index.html";
const loginPage = "/login.html";
const bookPage = "/book.html";
const editPage = "/edit.html";
const bookId = new URL(location.href).searchParams.get('id');
const token = getToken();

function  getToken(){
    return localStorage.getItem('token');
}

function checkToken(pageURL){
    if(pageURL.indexOf(loginPage) == -1 && token === null) {
        location.assign('./login.html');
    }
    if(pageURL.indexOf(loginPage) !== -1 && token !== null) {
        location.assign('./index.html');
    }
    return token;
}

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

async function checkUser() {
    const user = await getUserByToken(token);
    if (token == null || user === null){
        localStorage.clear();
        location.assign('./login.html');
        return;
    }
}

/* 로그인 함수 */
//(ID: test@marktube.tv / PW: 1234 서버에 있음)
async function login(event){ //submit 이벤트 달고옴
    event.preventDefault();//submit 관련된 이벤트 실행 막기
    event.stopPropagation();//상위로 이벤트 이동 막기
    const emailElement = document.querySelector('#userEmail');
    const passwordElement = document.querySelector('#userPassword');
    const email = emailElement.value;
    const password = passwordElement.value;
    try {//아이디 페스워드 보내기
        const res = await axios.post('https://api.marktube.tv/v1/me',{
            email: email,
            password : password //이름 같으면 email, password 라고만 쳐도 됨
        });
        const {token} = res.data;// const token = res.data.token;
        if(token===undefined){
            return;
        }
        localStorage.setItem('token', token);
        location.assign('./index.html');//인덱스 페이지로 이동
    } catch (error){
        const data = error.response.data;
        if(data){
            const state = data.error;
            if(state === 'USER_NOT_EXIST'){
                alert('사용자가 존재하지 않습니다.')
            }else if(state === 'PASSWORD_NOT_MATCH'){
                alert('비밀번호가 틀렸습니다.')
            }
        }
    }
}

/* Render Books on page */
async function deleteBook(bookId){
    await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
    return;
}

async function getBooksByToken(token){
    try {
        const res = await axios.get('https://api.marktube.tv/v1/book',{
            headers:{
                Authorization : `Bearer ${token}`,
            },
        });      
        return res.data;
    } catch(error){
        console.log('getBooks error', error);
        return null;
    }
}

async function getBook(bookId){
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
//index.html책 리스트 불러오기
function indexRender(books){
    const listElement = document.querySelector('#list .row');
    for (let i =0; i<books.length; i++){
        const book = books[i];
        const bookElement = document.createElement('div');
        bookElement.classList.value = 'col-md-4';
        bookElement.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="card-text">${book.title === '' ? '제목없음' : book.title}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href="book.html?id=${book.bookId}">
                                <button class="btn btn-sm btn-outline-secondary" type="button">VIEW</button>
                            </a>
                            <button class="btn btn-sm btn-outline-secondary btn-delete" type="button" data-book-id="${book.bookId}">DELETE</button>
                        </div>
                        <small class="text-muted">${new Date(book.createdAt,).toLocaleString()}</small>
                    </div>
                </div>
            </div>
        `
        listElement.append(bookElement);
    }
    document.querySelectorAll('.btn-delete').forEach(element =>{
        element.addEventListener('click', async event =>{
            const bookId = event.target.dataset.bookId;
            try{
                await deleteBook(bookId);
                location.reload();
            } catch (error){
                console.log(error);
            }
        })
    })
}

// book.html 책 그리기
function bookRender(book){
    const bookContainer = document.querySelector('#book_container');
    const bookInfoElement = document.createElement('div');
    bookInfoElement.classList.value= 'book_info';
    bookInfoElement.classList.add('card', 'text-start', 'mb-3');
    bookInfoElement.innerHTML = `
        <div class="card-header">
          <h3>Featured</h3>
        </div>
        <div class="card-body">
          <h5 class="card-title">"${book.title}"</h5>
          <p class="card-text">글쓴이 : <span>${book.author}</span></p>
          <p class="card-text">링크 : <a href="${book.url}">바로가기</a></p>
          <p class="card-text">한줄평 : <span>${book.message}</span></p>
          <a href="./edit.html?id=${book.bookId}" class="btn btn-primary">Edit</a>
          <button id="btn_delete" type="button" class="btn btn-danger">Delete</button>
        </div>
        <div class="card-footer text-muted">
          작성일 : <span>${book.updatedAt}</span>
        </div>`;
    bookContainer.append(bookInfoElement);
    document.querySelector('#btn_delete').addEventListener('click', async event =>{
        try{
            await deleteBook(book.bookId);
            location.assign('./index.html');
        } catch (error){
            console.log(error);
        }
    })
}

//edit.html 책 그리기
function editRender(book){
    const bookInfo = document.querySelectorAll('.bookInfo');
    bookInfo[0].value = book.title;
    bookInfo[1].value = book.message;
    bookInfo[2].value = book.author;
    bookInfo[3].value = book.url;   
}

/* 책정보 호출 후 그리기*/
async function renderBook(){    
    if(bookId){
        const book = await getBook(bookId);
        if(book === null){
            alert('서버에서 책 가져오기 실패');
            return;
        }
        //책정보페이지
        if(pageURL.indexOf(bookPage) !== -1){
            bookRender(book);
        }
        //책정보 수정페이지
        if(pageURL.indexOf(editPage) !== -1){
            editRender(book);
        }
    }
    
    //메인 페이지
    const books = await getBooksByToken(token);
    if(books === null){
        return;
    }
    if(pageURL.indexOf(indexPage) !== -1){
        indexRender(books);
    }
}

/* 책 추가 함수 */
async function save(event){
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

    //edit.html 에서 save
    if(bookId && pageURL.indexOf(editPage) !== -1){
        try {
            await axios.patch(`https://api.marktube.tv/v1/book/${bookId}`,{
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
    }else {       
        //add.html 에서 save
        try {
            await axios.post('https://api.marktube.tv/v1/book',{
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
    }
    event.target.classList.add('was-validated');//부트스트랩 문제없는 버튼 ui(?)
};


function cancel(event) {
    event.preventDefault();
    event.stopPropagation();    
    //edit.html
    if(pageURL.indexOf(editPage) !== -1){
        const urlBookId = new URL(location.href).search;//?id=5095
        location.assign(`./book.html${urlBookId}`);        
    }else {
        //add.html
        location.assign('./index.html');        
    }
}

async function logout(){
    try{
        await axios.delete('https://api.marktube.tv/v1/me',{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
    } catch(error){
        console.log('logout error', error);
    } finally {
        localStorage.clear();
        location.assign('./login.html')
    }
}


//Bind Event to Button
/* 저장 버튼 이벤트 연결 */
function bindSaveBtn(){
    const form = document.querySelector('#form-add-book');
    if (form){
        form.addEventListener('submit', save);
    }
}

/* 취소 버튼 이벤트 연결 */
function bindCancelBtn(){
    const cancelBtnElement = document.querySelector('#btn-cancel');
    if (cancelBtnElement){
        cancelBtnElement.addEventListener('click', cancel);
    }
}

/* 로그인 버튼 이벤트 */
function bindLoginBtn(){
    const form = document.querySelector('#form-login');
    if (form){
        form.addEventListener('submit', login);
    }
}

/* 로그아웃 버튼 이벤트 연결 */
function bindLogoutBtn(){
    const btnLogout = document.querySelector('#btn_logout');
    if (btnLogout){
        btnLogout.addEventListener('click', logout);
    }
}