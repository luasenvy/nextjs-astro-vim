export default function HelpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8 text-nvim-blue">Help page</h1>
      <div className="text-center">
        <p className="mb-4">version 0.0.1</p>
        <div className="flex flex-col text-left justify-left p-10">
          <p className="p-4">
            This page contains basic instructions to use this page. Some Vim key bindings are
            enabled and can be used within the page itself, but some of them don't work in all the
            pages since I did not considered it necessary.
          </p>

          <h2 className="p-4 text-2xl font-bold text-nvim-blue">Instructions</h2>
          <p className="ml-4">
            <span className="font-bold">u</span>: Undo the last change, in this case, it navigates
            up one level.
          </p>
          <p className="ml-4">
            <span className="font-bold">j</span>: Move the cursor down one line.
          </p>
          <p className="ml-4">
            <span className="font-bold">k</span>: Move the cursor up one line.
          </p>
          <p className="ml-4">
            <span className="font-bold">gg</span>: Move the cursor to the first line of the file, in
            this case, page.
          </p>
          <p className="ml-4">
            <span className="font-bold">G</span>: Move the cursor to the last line of the file, in
            this case, page.
          </p>
          <p className="ml-4">
            <span className="font-bold">:&lt;command&gt;</span>: Executes a command.
          </p>
        </div>
      </div>
    </div>
  );
}
