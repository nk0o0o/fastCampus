//토큰 가져오기
function getToken(){
    return localStorage.getItem('token');
}

//(ID: test@marktube.tv / PW: 1234 서버에 있음)
//로그인 
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

//로그인 버튼 이벤트
function bindLoginBtn(){
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login)
}

function main(){
    //버튼에 이벤트 연결
    bindLoginBtn();
    //토큰체크(로그인 되어있다면 이페이지에서 나가기)
    const token = getToken();
    if(token !== null){
        location.assign('./index.html');
        return;
    }
}

document.addEventListener('DOMContentLoaded', main);
