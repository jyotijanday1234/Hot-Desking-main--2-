import { useEffect, useState,Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import env from '../env.json'
// import success from "../../images/success.png";
// import styles from "./styles.module.css";
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${env.backend_url_user}/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log('inside try block');
				console.log(data);
				if(!(data.message == 'Invalid link')){
					setValidUrl(true);
				}
			} catch (error) {
				console.log('inside catch block');
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, []);
    const container = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
    const green_btn =  {
        border: 'none',
        outline: 'none',
        padding: '12px 0',
        backgroundColor: '#3bb19b',
        borderRadius: '20px',
        width: '180px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
    }
	return (
		<Fragment>
			{validUrl ? (
				<div style={container}>
					<img src='' alt="success_img"/>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button style={green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;