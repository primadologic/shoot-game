import UnityWebGL from "./components/UnityWebGL"




function App() {

  return (
    <section className="bg-gray-500 min-h-screen flex flex-col justify-center items-center gap-5 py-8">
      <h1 className="font-bold text-5xl text-center flex flex-row justify-center items-center w-full">
          Shoot &apos;Em Up
      </h1>
        <UnityWebGL />
    </section>
  )
}

export default App
