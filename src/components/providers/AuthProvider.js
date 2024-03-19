import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {callPostRefresuhToken} from "src/api/UserAPICalls";

export const AuthProvider = () => {
    const navigate = useNavigate();
    const accessToken = window.localStorage.getItem("accessToken");
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    const dispatch = useDispatch();

    dispatch(callPostRefresuhToken())

    // if (accessToken === null) {
    //     alert("로그인이 필요합니다.");
    //     navigate("/sign-up", { replace: true });
    //
    //     return <Navigate to={"/sign-up"} replace={true} />
    // }
    //
    // const verified = TokenExpiration(decodedToken);
    //
    // if (verified === false) {
    //     alert("로그인 세션시간이 만료되었습니다.");
    //
    //     return <Navigate to={"/sign-up"} replace={true} />
    // }

    return <Outlet />;
};

export const TokenExpiration = (decodedToken) => {
    if (decodedToken.exp * 1000 < Date.now()) {
        window.localStorage.removeItem("accessToken");
        return false;
    } else {
        // 엑세스 만료되지 않음
        return true;
    }
};

export const refreshTokenRequest = (dispatch, decodedToken) =>{
    const verified = TokenExpiration(decodedToken);

    if (verified === false) {
        dispatch(callPostRefresuhToken())
    }
}