import "@testing-library/jest-dom/extend-expect"
import { configure as testingLibraryConfigure } from "@testing-library/dom"

import React from "react"

global.React = React

testingLibraryConfigure({ testIdAttribute: "data-qa" })

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
