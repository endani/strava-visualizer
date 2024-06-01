import styled from 'styled-components'

const ChartContainer = styled.div`
  padding: 10;
  margin: 20 0;
  width: 100%;
  position: relative;
`

const CustomTooltipStyled = styled.div`
  background: #1f2937;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 12px;

  p {
    margin: 0;
  }
`

export { ChartContainer, CustomTooltipStyled }
