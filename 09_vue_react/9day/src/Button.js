import styled from 'styled-components';

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: skyblue;
  border: none;
  border-radius: ${({ round }) => round ? `9999px` : `3px`};
  color: #ffffff;
  font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px;
  padding: 16px;

  &:hover,
  &:active {
    background-color: yellowgreen;
  }
`;

export default Button;


