import useApp from "../hooks/useApp";

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "gray-400";
    case "loading":
      return "yellow-400";
    case "done":
      return "green-400";
    case "failed":
      return "red-500";
  }
};

const Connections = () => {
  const { state, loadIDX, loadCeramic } = useApp();
  return (
    <div className="fixed bottom-8 right-10 shadow-md py-1 px-2 rounded-lg border-1 border-gray-100">
      <div>
        <button onClick={loadCeramic}>
          <span
            className={`fill-current text-${statusColor(state.ceramic.status)}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-2 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Ceramic
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            if (state.provider.status === "done") {
              loadIDX(state.provider.provider);
            }
          }}
        >
          <span
            className={`fill-current text-${statusColor(
              state.ceramic.auth.status
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-2 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          IDX
        </button>
      </div>
    </div>
  );
};

export default Connections;
