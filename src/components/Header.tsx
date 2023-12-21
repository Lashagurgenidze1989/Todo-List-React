import React, { useState } from "react";
import Moon from "/images/icon-moon.svg";
import Sun from "/images/icon-sun.svg";
import { v4 as uuidv4 } from "uuid";
import checkedIcon from "/images/checked.svg";
import uncheckedIcon from "/images/unchecked.svg";

interface confirmProps {
  switchMode: boolean;
  setSwitchMode: React.Dispatch<React.SetStateAction<boolean>>;
  todoList: TODO[];
  setTodoList: React.Dispatch<React.SetStateAction<TODO[]>>;
}

interface TODO {
  id: string;
  description: string;
  status: boolean;
}

export default function Header(props: confirmProps) {
  const [newTodo, setNewTodo] = useState<string>("");
  const [checkedStatus, setCheckedStatus] = useState<boolean>(false);

  const addTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && newTodo) {
      props.setTodoList([
        {
          id: uuidv4(),
          description: newTodo,
          status: checkedStatus,
        },
        ...props.todoList,
      ]);
      setNewTodo("");
      setCheckedStatus(false);
    }
  };

  return (
    <div
      className={`${
        props.switchMode
          ? "bg-bgMobileLight 2xl:bg-bgDesktopLight"
          : "bg-bgMobileDark 2xl:bg-bgDesktopDark"
      } bg-no-repeat bg-cover px-6 2xl:px-[450px] py-12 2xl:py-16`}
    >
      <div className="flex flex-col gap-10 2xl:gap-[48px] relative">
        <div className="flex justify-between items-center">
          <img
            className={"2xl:w-[167px] 2xl:h-10"}
            src="/images/TODO.svg"
            alt="todo"
          />
          <img
            onClick={() => props.setSwitchMode(!props.switchMode)}
            src={props.switchMode ? Moon : Sun}
            alt="icon"
            className={"2xl:w-[25px] 2xl:h-[26px]"}
          />
        </div>
        <input
          value={newTodo}
          type="text"
          placeholder="Create a new todo…"
          className={`w-full pl-[50px] py-4 2xl:py-6  rounded-md  text-xs 2xl:text-[18px] ${
            props.switchMode
              ? `text-[#9495A5] bg-white shadow-boxShadow`
              : `text-[#767992] bg-[#25273D] shadow-DarkBoxShadow`
          }`}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => addTodo(e)}
        />
        <input
          type="checkbox"
          name="addCheck"
          className={`w-5 h-5 absolute top-[80px] 2xl:top-[110px] left-[20px] cursor-pointer z-10 opacity-0 ${
            props.switchMode ? ` bg-white` : ` bg-[#25273D]`
          }`}
          onChange={() => setCheckedStatus(!checkedStatus)}
          checked={checkedStatus}
        />
        <img
          className={`w-5 h-5 absolute left-[20px] top-[80px] 2xl:top-[110px]`}
          src={checkedStatus ? checkedIcon : uncheckedIcon}
          alt="check"
        />
      </div>
    </div>
  );
}
