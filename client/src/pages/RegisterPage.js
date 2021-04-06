import { useState } from 'react';
import { useHistory } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const field = ['firstName', 'lastName', 'userName', 'password'];


function RegisterPage() {
	const [form, setForm] = useState({});
	const [serverError, setServerError] = useState('');
	const history = useHistory();



	const onSubmit = async event => {
		try {
			event.preventDefault();
			// todo: validate
			const res = await fetch('/api/register', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(form),
			});

			const body = await res.json();
			if (!res.ok) {
				return setServerError(body.message);
			}
			history.push('/login');

		} catch (err) { }
	};
	const onChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<Typography component="h1" variant="h5">
				Register
		  </Typography>
			<form className={classes.form} onChange={onChange} onSubmit={onSubmit}>
				<TextField
					name="firstName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="firstName"
					label="first name"
					autoFocus
				/>
				<TextField
					name="lastName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Last name"
					type="text"
				
				/>
				<TextField
					name="userName"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="User Name"
					type="text"
					
				/>
				<TextField
					name="password"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="password"
					type="password"
					id="password"
				
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Register
			</Button>
				{!!serverError && <div className="error">{serverError}</div>}
			</form>
			<Box mt={8}>
			</Box>
		</Container>
	);
}

export default RegisterPage;


/*
<div className="App">
<form className="registerForm" onChange={onChange} onSubmit={onSubmit}>
	<label htmlFor="firstName">firstName</label>
	<input type="text" name="firstName" />
	<label htmlFor="lastName">lastName</label>
	<input type="text" name="lastName" />
	<label htmlFor="userName">userName</label>
	<input type="text" name="userName" />
	<label htmlFor="password">password</label>
	<input type="password" name="password" />
	<button>regiser</button>
	{!!serverError && <div className="error">{serverError}</div>}
</form>
</div>
*/