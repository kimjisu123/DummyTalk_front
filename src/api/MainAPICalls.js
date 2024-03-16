import {
    GET_FETCH_CHAT,
    GET_FRIEND,
    GET_FRIEND_REQUEST,
    GET_USER,
    POST_ADD_FRIEND,
    POST_APPROVAL,
    POST_CHANGE_USER, POST_REFUSAL
} from "../modules/MainModule";
import {jwtDecode} from "jwt-decode";
import {POST_CHANGE_PASSWORD} from "../modules/LoginModule";


const refreshToken  = window.localStorage.getItem('refreshToken');
const accessToken = window.localStorage.getItem('accessToken');
const decodedToken = accessToken ? jwtDecode(accessToken) : null;
const userNo = decodedToken && decodedToken.sub;

// 유저 조회 코드 ( JWT )
export const callGetNickname = () => {
    const requestURL = `${process.env.REACT_APP_API_URL}/user/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_USER, payload: result.data });
    }
}

// 친구 요청
export const callGetFriend = () => {
    const requestURL = `${process.env.REACT_APP_API_URL}/friend/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_FRIEND, payload: result.data });
    }
}

// 친구 요청 조회
export const callGetFriendRequest = () => {
    const requestURL = `${process.env.REACT_APP_API_URL}/friendRequest/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'RefreshToken' : refreshToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_FRIEND_REQUEST, payload: result.data });
    }
}

// 친구 조회
export const callPostFriend = (email) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/friend/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },body: JSON.stringify(email)
        }).then(response => response.json());
        alert(result.message)
        dispatch({ type: POST_ADD_FRIEND, payload: result.data });
    }
}
// 유저 프로필 수정
export const callPostChageUser = (data) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/change/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Accept': '*/*'
            },body: data
        }).then(response => response.json());
        alert(result.message)
        window.location.reload();
        if(result.status == 200){
            dispatch({ type: POST_CHANGE_USER, payload: result.data });
        }
    }
}

// 친구 요청 수락
export const callPostApproval = (friendId) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/approval/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },body: JSON.stringify(friendId)
        }).then(response => response.json());
        alert(result.message)
        dispatch(callGetFriendRequest())
        dispatch(callGetFriend())
        dispatch({ type: POST_APPROVAL, payload: result.data });
    }
}

// 친구 요청 거절
export const callPostRefusal = (friendId) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/refusal/${userNo}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },body: JSON.stringify(friendId)
        }).then(response => response.json());
        alert(result.message)
        dispatch(callGetFriendRequest())
        dispatch({ type: POST_REFUSAL, payload: result.data });
    }
}

// 비밀번호 변경
export const callPostPassword = (user) =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/changePassword`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(user)
        }).then(response => response.json());
        dispatch({ type: POST_CHANGE_PASSWORD, payload: result });
        alert(result.message)
        window.location.reload();
    }
}




export const callFetchChatData = (channelId) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/chat/${channelId}/${userNo}`
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_FETCH_CHAT, payload: result.data });
    }
}

export const callSearchData = () =>{
    const requestURL = `${process.env.REACT_APP_FAST_API_URL}/search}`
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + userNo + accessToken,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: " 임시테스트 ", payload: result.data });
    }
}

