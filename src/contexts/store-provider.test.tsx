import { render } from "@testing-library/react"
import { StoreProvider } from "./store-provider"

describe("StoreProvider", () => {
  it("should render the children", () => {
    const { getByText } = render(
      <StoreProvider>
        <div>children</div>
      </StoreProvider>
    )

    expect(getByText("children")).toBeInTheDocument()
  })
})
