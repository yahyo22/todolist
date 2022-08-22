import React from 'react'
import { MutatingDots } from  'react-loader-spinner'
import styled from "styled-components"
export default function Loding() {
  return (
    <StyledLoading>
        <main><MutatingDots  height = "120"
    width = "120"
    radius = "9"
    color = 'royalblue'/></main>
    </StyledLoading>
  )
}
const StyledLoading = styled.div`
    min-height: 100vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`