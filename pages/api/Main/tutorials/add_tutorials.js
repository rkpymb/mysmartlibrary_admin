import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}SuperAdmin/add_tutorials`, { 
            token: process.env.MYKEY,
            Title: req.body.Title,
            Content: req.body.Content,
            isActive: req.body.isActive,
            Image: req.body.Image
        
        
        },).then((response) => {
            const DataMain = response.data;
            res.status(200).json({ ReqD: DataMain })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}