import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import MySpinner from "./layout/MySpinner";
import cookie from 'react-cookies'
import { MyCartContext, MyUserContext } from "../configs/Contexts";

const Home = () => {
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook để chuyển hướng
    const [q] = useSearchParams();
    const user = useContext(MyUserContext);


    const loadDatabases = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['load_databases']);
            setDatabases(res.data);
            console.log(databases);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
       
    }

    useEffect(() => {
        if (!user) {
            navigate("/login"); // chuyển hướng nếu chưa đăng nhập
        } else {
            loadDatabases();
        }
    }, [user]);

    const createDb = async () => {
        try {
            setLoading(true);
            let res = await authApis().post(endpoints['load_databases']);
            console.log(res);
            loadDatabases();
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }
    const deleteDb = async (p) => {

        try {
            setLoading(true);
            let res = await authApis().delete(endpoints['delete_database'](p.name));
            console.log(res);
            loadDatabases();
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <MySpinner />}
            {databases.length === 0 ? <Alert variant="info" className="mt-2">Không có database nào!</Alert> : <>
                {/* <a href="https://www.phpmyadmin.co" target="_blank" rel="noopener noreferrer">
                    Truy cập phpMyAdmin
                </a> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>hostname</th>
                            <th>name</th>
                            <th>username</th>
                            <th>password</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(databases).map(c => <tr key={c.id}>
                            <td>{c.host}</td>
                            <td>{c.name}</td>
                            <td>{c.username_db}</td>
                            <td>{c.password_db}</td>
                            <td>
                                <Button variant='danger' onClick={() => deleteDb(c)}>&times;</Button>
                            </td>
                        </tr>)}


                    </tbody>
                </Table>
            </>}


            <Button variant="info" onClick={createDb}>Tạo database</Button>

        </>
    );
}

export default Home;