import { useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

interface TODO {
  id: string;
  description: string;
  status: boolean;
}

function App() {
  const [switchMode, setSwitchMode] = useState(true);
  const [todoList, setTodoList] = useState<TODO[]>([]);

  return (
    <>
      <div className="w-[375px] 2xl:w-[1440px]">
        <Header
          switchMode={switchMode}
          setSwitchMode={setSwitchMode}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        <MainContainer
          todoList={todoList}
          setTodoList={setTodoList}
          switchMode={switchMode}
          setSwitchMode={setSwitchMode}
        />
      </div>
    </>
  );
}

export default App;
