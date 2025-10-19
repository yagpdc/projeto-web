import React from "react";

function App() {
  const [dataTeste, setTeste] = React.useState<string>("");
  const [value1, setValue1] = React.useState<number>(0);
  const [value2, setValue2] = React.useState<number>(0);

  const fetchData = () => {
    fetch(`http://localhost:3000/add/${value1}/${value2}`)
      .then((response) => response.json())
      .then((data) => setTeste(data.sum))
      .catch((error) => console.error("Error fetching data:", error));
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <input
          className="border-2 border-slate-700"
          type="number"
          value={value1}
          onChange={(e) => setValue1(Number(e.target.value))}
        />

        <input
          className="border-2 border-slate-700"
          type="number"
          value={value2}
          onChange={(e) => setValue2(Number(e.target.value))}
        />

        {/* <p>Projeto full stack board game </p> */}
        <span className="text-2xl font-bold text-slate-900">{dataTeste}</span>
        <button
          onClick={fetchData}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Recarregar
        </button>
      </div>
    </div>
  );
}

export default App;
