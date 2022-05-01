const Button = (props: any) => (
  <button
    type="button"
    className="inline-flex items-center px-4 py-2 mb-10 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {props.label}
  </button>
)

export { Button }
