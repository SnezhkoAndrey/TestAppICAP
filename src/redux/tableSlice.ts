import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import HTTPClient from "../api/api";

const { GET, POST, PUT } = HTTPClient();

const initialState = {
  people: [] as PeopleType[],
  nextPage: "",
  prevPage: "",
  loadingData: false,
  error: "",
  isAuthData: false,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<PeopleType[]>) => {
      state.people = action.payload;
    },

    setNextPage: (state, action: PayloadAction<string>) => {
      state.nextPage = action.payload;
    },
    setPrevPage: (state, action: PayloadAction<string>) => {
      state.prevPage = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingData = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAuth,
  setLoading,
  setError,
  setPeople,
  setNextPage,
  setPrevPage,
} = tableSlice.actions;

export const peopleData = ({ table }: RootState) => table.people;
export const nextPageData = ({ table }: RootState) => table.nextPage;
export const prevPageData = ({ table }: RootState) => table.prevPage;
export const isAuthData = ({ table }: RootState) => table.isAuthData;
export const loadingData = ({ table }: RootState) => table.loadingData;
export const errorData = ({ table }: RootState) => table.error;

export const login =
  (user: UserType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const response = await POST(`login/`, user);
      if (response.error) {
        dispatch(setError(response.error));
      }
      dispatch(setAuth(response.message ? true : false));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const setPeopleData =
  (endpoint: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const response = await GET(`table/${endpoint}`);

      dispatch(setPeople(response.results));
      dispatch(setNextPage(response.next ? response.next : ""));
      dispatch(setPrevPage(response.previous ? response.previous : ""));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const createPeople =
  (user: PeopleType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      await POST(`table/`, user);
      dispatch(setPeopleData("?limit=10"));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const editPeople =
  (id: number | undefined, value: PeopleType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      await PUT(`table/${id}`, value);
      dispatch(setPeopleData("?limit=10"));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export default tableSlice.reducer;
