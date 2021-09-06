//로그아웃 
async function logout(){
    const token = getToken();
    if(token === null){
        location.assign('./login.html');
        return;
    }
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

// 로그아웃 버튼 이벤트
function bindLogoutButton(){
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click', logout)
}

// 토큰 가져오기
function getToken(){
    return localStorage.getItem('token')
}

// 토큰으로 사용자 정보 가져오기
async function getUserByToken(token){
    try {
        const res = await axios.get('https://api.marktube.tv/v1/me',{
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
// 토큰으로 책 정보 가져오기
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
//책 리스트 불러오기
function render(books){
    const listElement = document.querySelector('#list');
    for (let i =0; i<books.length; i++){
        const book = books[i];
        const bookElement = document.createElement('div');
        bookElement.classList.value = 'col-md-4';
        bookElement.innerHTML = `
        <div class="card mb-4 shadow-sm">
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
// 목록에서 책 삭제하기
async function deleteBook(bookId){
    const token = getToken();
    if(token === null){
        location.assign('login.html');
        return;
    }//토큰 검사
    await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
    return;
}

async function main(){
    //버튼에 이벤트 연결
    bindLogoutButton();
    //토큰 체크(로그인)
    const token = getToken();
    if(token === null){
        location.assign('./login.html');//로그아웃 되고 로그인 페이지로 넘어감
        //location.replace('url') : 히스토리 안 남김, 뒤로가기 시 히스토리있는 페이지로 이동, 도배성 글을 방지
        //location.assign('url') : 히스토리 남김, 이전 주소로 이동 가능 
        //location.href = 'url' : 히스토리 남김, 이전 주소로 이동 가능 assign보다 좀더 빠름
        return;
    }
    //토큰으로 서버에서 나의 정보 받아오기(토큰 문제 있는지 확인 오류있으면 로그아웃됨)
    const user = await getUserByToken(token);
    if(user === null){
        localStorage.clear();
        location.assign('./login.html')
        return;
    }
    // 나의 책을 서버에서 받아오기
    const books = await getBooksByToken(token);
    if(books === null){
        return;
    }
    // 받아온 책을 그리기
    render(books);
}
//DOMContentLoaded : html완전히 로드, 파싱 되었을때 실행 (load보다 빠름)
document.addEventListener('DOMContentLoaded', main)