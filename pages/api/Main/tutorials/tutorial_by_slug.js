import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}SuperAdmin/tutorial_by_slug`, { 
            token: process.env.MYKEY,
            slug: req.body.slug,
          
        
        },).then((response) => {
            const DataMain = response.data;
            res.status(200).json({ ReqD: DataMain })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}