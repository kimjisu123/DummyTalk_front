import {
    POST_LOGIN,
    POST_SIGN_UP,
    POST_CHECK,
    POST_MAIL,
    POST_GOOGLE_LOGIN,
    POST_FIND_EMAIL, POST_PASSWORD_MAIL,
    POST_REFRESHTOKEN
} from "../modules/LoginModule";
import {jwtDecode} from "jwt-decode";
import {Navigate, useNavigate} from "react-router-dom";
import {TokenExpiration} from "src/components/providers/AuthProvider";




const refreshToken= window.localStorage.getItem('refreshToken');
const accessToken= window.localStorage.getItem('accessToken');
const decodedToken = accessToken ? jwtDecode(accessToken) : null;
const userNo = decodedToken && decodedToken.sub;

export const callPostSignUp = (user) => {

    const requestURL = `${process.env.REACT_APP_API_URL}/signUp`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            // withCredentials: true, // 필요에 따라 설정
            body: JSON.stringify(user)
        }).then(response => response.json());

        /* 응답 상태 코드에 따른 처리*/
        if(result.status == "500"){
            dispatch({ type: POST_SIGN_UP, payload: result });
            alert(result.message)
            // console.log(result);
        } else{
            dispatch({ type: POST_SIGN_UP, payload: result });
            // console.log(resul3t);
            alert(result.message)
        }
    }
}

// 로그인
export const callPotLogin = (user) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/login`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            // withCredentials: true, // 필요에 따라 설정
            body: JSON.stringify(user)
        }).then(response => response.json());

        dispatch({ type: POST_LOGIN, payload: result });
        if(result.status == 200){

            window.localStorage.setItem('accessToken', result.data.accessToken); // key : value
            window.localStorage.setItem('refreshToken', jwtDecode(result.data.accessToken).refreshToken);
            dispatch({ type: POST_LOGIN, payload: result });
            alert(result.message)
            window.location.reload();

        } else{
            dispatch({ type: POST_LOGIN, payload: result });
            alert(result.message)
        }
    }
}

// 구글 로그인
export const callPostGoogleLogin = (credential) =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/googleLogin`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(credential)
        }).then(response => response.json());

        console.log(result.data)
        if(result.status == 200){
            window.localStorage.setItem('accessToken', result.data.accessToken); // key : value
            window.localStorage.setItem('refreshToken', jwtDecode(result.data.accessToken).refreshToken);
            console.log(window.localStorage.get)
            dispatch({ type: POST_GOOGLE_LOGIN, payload: result });
            alert(result.message)
            window.location.reload();
        }
    }
}

export const callPostMail = (userEmail) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/userEmail`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(userEmail)
        }).then(response => response.json());
        alert(result.data)
        dispatch({ type: POST_MAIL, payload: result });
    }
}

export const callPostCheck = (userSubmit) =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/checkNum`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(userSubmit)
        }).then(response => response.json());
        alert(result.message)
        dispatch({ type: POST_CHECK, payload: result });
    }
}

export const callPostEmail = (email) =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/findEmail`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(email)
        }).then(response => response.json());
        dispatch({ type: POST_FIND_EMAIL, payload: result });
    }
}

export const callPostPasswordMail = (email) =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/passwordMail`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(email)
        }).then(response => response.json());
        dispatch({ type: POST_PASSWORD_MAIL, payload: result });
        alert(result.message)
        if(result.status == 500){
            window.location.reload();
        }
    }
}
export const callPostRefresuhToken = () =>{
    const requestURL = `${process.env.REACT_APP_API_URL}/refreshToken`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify({"refreshToken" : refreshToken})
        }).then(response => response.json());
        dispatch({ type: POST_REFRESHTOKEN, payload: result });
        if(result.status == 200){
            window.localStorage.setItem('accessToken', result.data.accessToken);
        } else {
            if(window.localStorage.getItem('accessToken') == null) {
                alert("로그인이 필요합니다.");

                return <Navigate to={"/sign-up"} replace={true}/>
            }

            const verified = TokenExpiration(decodedToken);

            if (verified === false) {
                alert("로그인 세션시간이 만료되었습니다.");

                return <Navigate to={"/sign-up"} replace={true} />
            }
        }
    }
}

