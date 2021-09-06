//토큰 받아오기
function getToken(){
    return localStorage.getItem('token');
}

//로그아웃 버튼
function bindLogoutBtn(){
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click', logout)
}

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
};

//유저정보 받아오기
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
//책 삭제 버튼
async function deleteBook(bookId){
    const token = getToken();
    if(token === null){
        location.assign('./login.html');
        return;
    }
    await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });

}
//책 그리기
function render(book){
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

async function main(){
    //버튼에 이벤트 연결
    bindLogoutBtn();
    
    //브라우저에서 id가져오기
    const bookId = new URL(location.href).searchParams.get('id');

    //토큰 체크
    const token = getToken();
    if(token === null){
        location.assign('./login.html');
        return;
    }
    //토큰으로 서버에서 내정보 받아오기
    const user = await getUserByToken(token);
    if(user === null){
        localStorage.clear();
        location.assign('./login.html')
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
