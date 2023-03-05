
import { useState } from 'react';
import styled from 'styled-components';



const StyledInput = styled.input`
    font-size: 24px

`

function Login() {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/; //비번 정규식
    const [emailValue, setEmailValue] = useState()
    const [pwValue, setPwValue] = useState()
  
    return (
        <form>
            <label htmlFor="emailInput">이메일</label>
            <StyledInput id='emailInput'
                type='email'
                name=''
                value=''
                placeholder='styled@codeit.kr'
                readOnly
                onChange={emailValue}
            />
            <label htmlFor="pwInput">비밀번호</label>
            <StyledInput id='pwInput'
                type='password'
                name=''
                value=''
                placeholder='비밀번호'
                readOnly
                onChange={pwValue}
            />
        </form>
      );
}

export default Login;