import React, { useEffect, useRef, useState } from "react";
import Cross from "/images/icon-cross.svg";
import listCheckedIcon from "/images/checked.svg";
import listUncheckedIcon from "/images/unchecked.svg";

interface ComponentProps {
  todoList: Array<{ id: string; description: string; status: boolean }>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  switchMode: boolean;
  setSwitchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Todo {
  id: string;
  description: string;
  status: boolean;
}

export default function Main(props: ComponentProps) {
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(props.todoList));
  }, [props.todoList]);

  useEffect(() => {
    try {
      const storedTodoList = localStorage.getItem("todolist");
      if (storedTodoList) {
        const parsedTodoList: Todo[] = JSON.parse(storedTodoList);
        props.setTodoList(parsedTodoList);
        return;
      }
    } catch (error) {
      console.error("Error", error);
      props.setTodoList([]);
    }
  }, [props.setTodoList]);

  const filteredTodos = props.todoList.filter((item) => {
    return filter === "All"
      ? true
      : filter === "Active"
      ? !item.status
      : filter === "Completed"
      ? item.status
      : false;
  });

  const checkBoxHandler = (id: string) => {
    const newArr = props.todoList.slice();
    const indexOfObj = newArr.findIndex((item) => item.id === id);
    if (indexOfObj >= 0) {
      newArr[indexOfObj].status = !newArr[indexOfObj].status;
    }
    props.setTodoList(newArr);
  };

  const deleteTodo = (id: string) => {
    const newArr = props.todoList.slice();
    const indexOfObj = newArr.findIndex((item) => item.id === id);
    if (indexOfObj >= 0) {
      newArr.splice(indexOfObj, 1);
      props.setTodoList(newArr);
    }
  };

  const clearHandler = () => {
    const updateTodoList = props.todoList.filter((item) => !item.status);
    props.setTodoList(updateTodoList);
  };

  const filterHandler = (e: string) => {
    setFilter(e);
  };

  const dragPerson = useRef<number>(0);
  const dragedPerson = useRef<number>(0);

  const handleSort = () => {
    const todolistClone = [...props.todoList];
    const temp = todolistClone[dragPerson.current];
    todolistClone[dragPerson.current] = todolistClone[dragedPerson.current];
    todolistClone[dragedPerson.current] = temp;
    props.setTodoList(todolistClone);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center pt-7 pb-[72px] ${
        props.switchMode ? `bg-[#FAFAFA]` : `bg-[#171823]`
      }`}
    >
      <div
        className={`w-[327px] 2xl:w-[540px] rounded-[5px]  px-5 2xl:px-6  mt-[-55px]  2xl:mt-[-68px] mb-4 2xl:mb-0 ${
          props.switchMode
            ? `bg-[#FFF] shadow-boxShadow`
            : `bg-[#25273D] shadow-darkBoxShadow`
        }`}
      >
        <ul className="flex flex-col gap-2">
          {filteredTodos.map((item, index) => {
            return (
              <div
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (dragedPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                key={item.id}
                className={`flex justify-between items-center py-4 2xl:py-5 border-b border-solid relative  ${
                  props.switchMode ? `border-[#E3E4F1]` : `border-[#393A4B]`
                }`}
              >
                <img
                  className={`w-5 h-5 absolute left-[0px] top-[18px] 2xl:top-[26px]`}
                  src={item.status ? listCheckedIcon : listUncheckedIcon}
                  alt="check"
                />
                <div className="flex gap-3 items-center ">
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => checkBoxHandler(item.id)}
                    className="w-5 h-5 cursor-pointer z-10 opacity-0"
                  />
                  <li
                    className={`${
                      props.switchMode ? "text-[#494C6B]" : "text-[#C8CBE7]"
                    } ${
                      item.status ? ` line-through` : ` no-underline`
                    }   text-3 2xl:text-[20px]`}
                  >
                    {item.description}
                  </li>
                </div>

                <img
                  onClick={() => deleteTodo(item.id)}
                  className="w-3 h-3 cursor-pointer"
                  src={Cross}
                  alt="x"
                />
              </div>
            );
          })}
        </ul>
        <div
          className={`flex justify-between py-6  ${
            props.switchMode ? `text-[#9495A5]` : `text-[#5B5E7E]`
          }`}
        >
          <p>{`${props.todoList.length} items left`}</p>
          <p className="cursor-pointer" onClick={() => clearHandler()}>
            Clear Completed
          </p>
        </div>
      </div>

      <div className="">
        <div
          className={`flex justify-center gap-5 2xl:gap-20 w-[327px] 2xl:w-[540px] rounded-[5px] py-4 2xl:py-6 mb-10 font-bold text-[14px] ${
            props.switchMode
              ? "bg-white shadow-boxShadow"
              : `bg-[#25273D] shadow-darkBoxShadow`
          }`}
        >
          <p
            onClick={() => filterHandler("All")}
            className={`${
              filter === "All" ? "text-[#3A7CFD]" : "text-[#9495A5]"
            } cursor-pointer`}
          >
            All
          </p>
          <p
            style={
              filter === "Active" ? { color: "#3A7CFD" } : { color: "#9495A5" }
            }
            onClick={() => filterHandler("Active")}
            className={`${
              props.switchMode ? "text-[#9495A5]" : "text-[#5B5E7E]"
            }  cursor-pointer`}
          >
            Active
          </p>
          <p
            onClick={() => filterHandler("Completed")}
            className={`${
              props.switchMode ? "text-[#9495A5]" : "text-[#5B5E7E]"
            } ${
              filter === "Completed" ? "text-[#3A7CFD]" : "text-[#9495A5]"
            } cursor-pointer`}
          >
            Completed
          </p>
        </div>
      </div>

      <p
        className={`${
          props.switchMode ? "text-[#9495A5]" : "text-[#5B5E7E]"
        } text-[14px]`}
      >
        Drag and drop to reorder list
      </p>
    </div>
  );
}
