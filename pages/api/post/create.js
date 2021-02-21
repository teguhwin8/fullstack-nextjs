import db from "../../../libs/db"

export default async function handler(req, res) {
    // Check request method
    if (req.method !== 'POST') return res.status(405).end()

    // Define req variable
    const { title, content } = req.body

    // Create data
    const create = await db('posts').insert({
        title,
        content
    })

    // Select data
    const createdData = await db('posts').where('id', create).first()

    // Response
    res.status(200)
    res.json({
        message: "Post created succesfully",
        data: createdData
    })
}