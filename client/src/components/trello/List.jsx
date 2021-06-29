import React, { useEffect } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  loadList,
  listSelector,
  checkList,
  uncheckList,
  removeList,
} from "../../features/trello";

function List() {
  const dispatch = useDispatch();
  let { list, loading, error } = useSelector(listSelector);

  useEffect(() => {
    dispatch(loadList());
  }, [dispatch, removeList]);
  return (
    <>
      <div className="list">
        {loading && "loading..."}
        {error && "Error Occured.."}
        {list.map((item, index) => (
          <div className="list-item" key={index}>
            <p>{item.task}</p>
            {item.completed === true ? (
              <span
                onClick={() => {
                  dispatch(uncheckList(item.id));
                }}
              >
                <FaCheck />
              </span>
            ) : (
              <span
                onClick={() => {
                  dispatch(checkList(item.id));
                }}
              >
                <ImCheckboxUnchecked />
              </span>
            )}

            <span
              onClick={() => {
                dispatch(removeList(item.id));
                 window.location.reload(true);
              }}
            >
              <FaTrash />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
