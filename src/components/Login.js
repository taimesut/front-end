import { useContext, useRef, useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./layout/MySpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookie from 'react-cookies'
import { MyDispatchContext } from "../configs/Contexts";

const Login = () => {
    const info = [{
        label: "Tên đăng nhập",
        field: "username",
        type: "text"
    }, {
        label: "Mật khẩu",
        field: "password",
        type: "password"
    }];

    const [user, setUser] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const dispatch = useContext(MyDispatchContext);
    const [q] = useSearchParams();


    const login = async (e) => {
        e.preventDefault();


            try {
                setLoading(true);

                let res = await Apis.post(endpoints['login'], { ...user });
                cookie.save('token', res.data.token);
                console.log(res.data.token);

                dispatch({
                    "type": "login",
                    "payload": user.username
                });
                
                console.log(user.username);
                let next = q.get('next');
                if (next)
                    nav(next);
                else
                    nav('/');
            } catch (ex) {
                console.error(ex);
                setMsg("login failed");
            } finally {
                setLoading(false);
            }
        
    }

    return (
        <>
            <h1 className="text-center text-success mt-2">ĐĂNG NHẬP NGƯỜI DÙNG</h1>

            {msg && <Alert variant="danger" className="mt-1">{msg}</Alert>}

            <Form onSubmit={login}>
                {info.map(i =>  <Form.Group className="mb-3">
                    <Form.Control value={user[i.field]} onChange={e => setUser({...user, [i.field]: e.target.value})} type={i.type} placeholder={i.label} required />
                </Form.Group>)}

                <Form.Group className="mb-3">
                    {loading === true?<MySpinner />:<Button type="submit" variant="danger">Đăng nhập</Button>}
                </Form.Group>
               
            </Form>
        </>
    );
}

export default Login;