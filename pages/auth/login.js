import React, { useState } from "react"
import style from "./login.module.css"

export default function login() {
	const [fields, setFields] = useState({
		email: '',
		password: ''
	})

	const [status, setStatus] = useState({
		type: '',
		message: ''
	})

	async function loginHandler(e) {
		e.preventDefault()

		setStatus({
			type: 'default',
			message: 'Please wait ...'
		})

		const loginReq = await fetch('/api/auth/login', {
			method: "POST",
			body: JSON.stringify(fields),
			headers: {
				'Content-Type': 'application/json'
			}
		})


		if (!loginReq.ok) return setStatus({
			type: 'error',
			message: 'Login error ' + loginReq.status
		})

		const loginRes = await loginReq.json()

		setFields({
			email: '',
			password: ''
		})
		setStatus({
			type: 'success',
			message: 'Login successfully'
		})
	}

	function fieldHanlder(e) {
		setStatus({
			type: '',
			message: ''
		})
		const name = e.target.getAttribute('name')

		setFields({
			...fields,
			[name]: e.target.value
		})
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginHandler.bind(this)}>

				{/* Email */}
				<input
					type="text"
					name="email"
					placeholder="Email"
					required
					value={fields.email}
					onChange={fieldHanlder}
				/>

				{/* Password */}
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					value={fields.password}
					onChange={fieldHanlder}
				/>
				<br />

				{/* Submit Button */}
				<button type="submit">
					Login Now
        </button>

				{/* Status */}
				<div className={"warning " + status.type}>{status.message}</div>
			</form>
		</div>
	)
}
