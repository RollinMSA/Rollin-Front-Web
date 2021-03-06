export type board = {
  id: number;
  userId: number;
  content: string;
  img: string;
  date: Date;
  userName: string;
  userImg: string;
};
export type boardState = {
  allBoards: Array<board>;
  boardsLoading: boolean;
  boardsDone: false;
  boardsError: Error;
};
const initialState: boardState = {
  allBoards: [],
  boardsLoading: false,
  boardsDone: false,
  boardsError: null,
};

export const BOARDS_REQUEST = "BOARDS_REQUEST";
export const SELECT_ALL_BOARDS = "SELECT_ALL_BOARDS";
export const FAILED_REQUEST = "FAILED_REQUEST";
export const INSERT_REQUEST = "INSERT_REQUEST";
export const INSERT_BOARD = "INSERT_BOARD";

export const insertBoard = (data: { content: string; img: string; file: string }) => {
  console.log("action / insultBoards");
  return {
    type: INSERT_REQUEST,
    data: data,
  };
};

export const selectAllBoards = () => {
  console.log("action / selectAllBoards");
  return {
    type: BOARDS_REQUEST,
  };
};

const boards = (state = initialState, action: { type: any; payload: any; error: any }) => {
  switch (action.type) {
    case INSERT_REQUEST: {
      console.log("reducer / 사진 업로드 요청");
      return {
        ...state,
        boardsLoading: true,
        boardsDone: false,
        boardsError: null,
      };
    }
    case BOARDS_REQUEST: {
      console.log("reducer / 사진 가져오기 요청");
      return {
        ...state,
        allBoards: [],
        boardsLoading: true,
        boardsDone: false,
        boardsError: null,
      };
    }
    case SELECT_ALL_BOARDS: {
      console.log("reducer / 사진 가져오기 완료");
      console.log("reducer / ", action.payload);
      return {
        ...state,
        allBoards: action.payload,
        boardsLoading: false,
        boardsDone: true,
      };
    }
    case INSERT_BOARD: {
      console.log("reducer / 사진 업로드 완료");
      console.log(action.payload);
      return {
        ...state,
        allBoards: action.payload,
        boardsLoading: false,
        boardsDone: true,
      };
    }
    case FAILED_REQUEST: {
      console.log("reducer / 사진 가져오기 실패");
      return {
        boardsLoading: false,
        boardsError: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default boards;

//allboard: {...allboard, data}
