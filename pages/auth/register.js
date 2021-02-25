import React, { useState } from "react"
import style from "./register.module.css"

export default function register() {
	const [fields, setFields] = useState({
		email: '',
		password: ''
	})

	const [status, setStatus] = useState('')

	async function registerHandler(e) {
		e.preventDefault()

		setStatus('loading')

		const registerReq = await fetch('/api/auth/register', {
			method: "POST",
			body: JSON.stringify(fields),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!registerReq.ok) return setStatus('error' + registerReq.status)

		const registerRes = await registerReq.json()

		setStatus('success')
	}

	function fieldHanlder(e) {
		const name = e.target.getAttribute('name')

		setFields({
			...fields,
			[name]: e.target.value
		})
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerHandler.bind(this)}>

				{/* Email */}
				<input
					type="text"
					name="email"
					placeholder="Email"
					onChange={fieldHanlder}
				/>

				{/* Password */}
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={fieldHanlder}
				/>
				<br />

				{/* Submit Button */}
				<button type="submit">
					Register Now
        </button>

				{/* Status */}
				<div className={style.bgWarning}>{status}</div>
			</form>
		</div>
	)
}
