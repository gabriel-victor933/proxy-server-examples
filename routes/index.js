import { Router } from "express";
import needle from "needle";
import url from 'url'
import apicache from "apicache"

const route = Router()

const cache = apicache.middleware

route.get('/',cache('2 minute'),async (req,res) => {

    try {   
        const params = new URLSearchParams({
            [process.env.API_KEY_NAME]: process.env.API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })
        
        const apiRes = await needle('get',`${process.env.API_BASE_URL}?${params}`)

        const data = apiRes.body

        res.status(200).json(data)
    } catch(error){
        res.status(200).json({error})
    }


})

export default route