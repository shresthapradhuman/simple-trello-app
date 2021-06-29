import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "trello",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    listRequested: (state) => {
      state.status = "loading";
    },
    listSuccessed: (state, action) => {
      state.status = "success";
      state.list = state.list.concat(action.payload);
    },
    listFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    listAdded: (state, action) => {
      state.list.push(action.payload);
    },
    listChecked: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].completed = true;
    },
    listUnchecked: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      state.list[index].completed = false;
    },
  },
});
export const {
  listAdded,
  listFailed,
  listRequested,
  listSuccessed,
  listChecked,
  listUnchecked,
} = slice.actions;
export default slice.reducer;

export const listSelector = (state) => state.trello;

export const loadList = () => async (dispatch) => {
  dispatch(listRequested());
  try {
    const response = await fetch("http://localhost:3001/tasks");
    const data = await response.json();
    dispatch(listSuccessed(data));
  } catch (error) {
    dispatch(listFailed(error));
  }
};

export const addList = (listData) => async (dispatch) => {
  try {
    if(!listData){
      return;
    }
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: listData,
        completed: false,
      }),
    });
    const data = await response.json();
    dispatch(listAdded(data));
  } catch (error) {
    dispatch(listFailed(error));
  }
};

export const checkList = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    });
    const data = await response.json();
    dispatch(listChecked(data));
  } catch (error) {
    dispatch(listFailed(error));
  }
};
export const uncheckList = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: false,
      }),
    });
    const data = await response.json();
    dispatch(listUnchecked(data));
  } catch (error) {
    dispatch(listFailed(error));
  }
};

export const removeList = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    dispatch(listFailed(error));
  }
};
