import React, { useState } from "react"
import { unauthPage } from "../../middlewares/authorizationPage"

export async function getServerSideProps(ctx) {
	await (unauthPage(ctx))
	return { props: {} }
}

export default function register() {
	const [fields, setFields] = useState({
		email: '',
		password: ''
	})

	const [status, setStatus] = useState({
		type: '',
		message: ''
	})

	async function registerHandler(e) {
		e.preventDefault()

		setStatus({
			type: 'default',
			message: 'Please wait ...'
		})

		const registerReq = await fetch('/api/auth/register', {
			method: "POST",
			body: JSON.stringify(fields),
			headers: {
				'Content-Type': 'application/json'
			}
		})


		if (!registerReq.ok) return setStatus('error' + registerReq.status)

		const registerRes = await registerReq.json()

		setFields({
			email: '',
			password: ''
		})
		setStatus({
			type: 'success',
			message: 'Register successfully'
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
			<h1>Register</h1>
			<form onSubmit={registerHandler.bind(this)}>

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
					Register Now
        </button>

				{/* Status */}
				<div className={"warning " + status.type}>{status.message}</div>
			</form>
		</div>
	)
}
