import React, { useState, useEffect } from "react"
import Cookie from "js-cookie"
import Router from "next/router"
import { unauthPage } from "../../middlewares/authorizationPage"

export async function getServerSideProps(ctx) {
	await (unauthPage(ctx))
	return { props: {} }
}

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

		setStatus({
			type: 'success',
			message: 'Login successfully'
		})

		Router.push('/posts')

		Cookie.set('token', loginRes.token)
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
