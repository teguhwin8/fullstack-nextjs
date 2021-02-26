import { authPage } from "../../middlewares/authorizationPage"

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx)

	const postReq = await fetch('http://localhost:3000/api/post', {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})

	const posts = await postReq.json()

	return {
		props: {
			posts: posts.data
		}
	}
}

export default function index(props) {
	return (
		<div>
			<h3>Posts</h3>

			{props.posts.map(post => 
				<div key={post.id}>
					<strong>{post.title}</strong>
				</div>
			)}
		</div>
	)
}
