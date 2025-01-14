
import { useEffect, useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';
 import {useAuth} from "../../context/auth";

import axios from 'axios';
import Spinner from "../Spinner";
const API = "http://localhost:5080/api/v1";
 
export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate(); // Use navigate for redirect

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${API}/auth/admin-auth`);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate(`/`); // Redirect to user dashboard if unauthorized
                }
            } catch (error) {
                console.error('Authorization error:', error);
                setOk(false);
                navigate(`/`); // Redirect on error
            }
        };
        
        if (auth?.token) authCheck();
    }, [auth?.token, navigate]);

    return ok ? <Outlet /> : <Spinner path="" />;
}
