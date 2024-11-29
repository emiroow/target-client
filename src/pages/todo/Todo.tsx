import useAuth from "@/store/useAuth";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import AddTodo from "./components/AddTodo";
import TodoInfoBox from "./components/TodoInfoBox";
import ContentBox from "./components/template/ContentBox";
import TodoItem from "./components/template/TodoItem";

const Todo = () => {
  const store = useAuth((state) => state.auth);
  useEffect(() => {
    console.log(store);
  });
  return (
    <Fragment>
      {/* container */}
      <div className="w-full justify-center d-flex mt-10">
        {/* Box,s */}
        <div className="flex gap-3 flex-col">
          {/* box info */}
          <TodoInfoBox />

          {/* Search & Filter Box */}
          {/* <div className=" w-[95%] md:w-[60%] lg:w-[50%] 2xl:w-[30%] m-auto flex flex-row justify-between">
            <label className="input max-sm:input-sm input-bordered flex items-center input-secondary">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <select className="select max-sm:select-sm select-bordered select-secondary">
              <option disabled selected>
                
              </option>
              <option>Game of Thrones</option>
              <option>Lost</option>
              <option>Breaking Bad</option>
              <option>Walking Dead</option>
            </select>
          </div> */}

          {/* Add Box */}
          <AddTodo />

          {/* content box */}
          <ContentBox>
            <TodoItem />
          </ContentBox>
        </div>
      </div>
    </Fragment>
  );
};

export default Todo;
