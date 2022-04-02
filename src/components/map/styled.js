import styled from "styled-components"

const Map = styled.div`
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  background: #74ccef;
  opacity: 0.5;
`

const MapImageLarge = styled.div`
  width: 190px;
  height: 190px;
`

const MapImageSmall = styled.div`
  width: 50px;
  height: 50px;
  display: none;
  overflow: hidden;
`

export { Map, MapImageLarge, MapImageSmall }
