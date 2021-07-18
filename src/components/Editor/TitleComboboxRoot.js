import styled, { css } from 'styled-components'

const TitleComboboxRoot = styled.ul`
  ${({ isOpen }) =>
    isOpen &&
    css`
      top: 400px;
      left: 200px;
      position: absolute;
      padding: 0;
      margin: 0;
      z-index: 11;
      background: white;
      width: 300px;
      border-radius: 0 0 2px 2px;
      box-shadow: rgba(0, 0, 0, 0.133) 0 3.2px 7.2px 0,
        rgba(0, 0, 0, 0.11) 0 0.6px 1.8px 0;
    `}
`
export default TitleComboboxRoot