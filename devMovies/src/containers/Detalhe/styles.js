import styled from 'styled-components'


export const Background = styled.div`

    background-image: url(${ (props) => props.$image });
    height: 50vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;


    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0000005d;
    }

`

export const Container = styled.div`

`
