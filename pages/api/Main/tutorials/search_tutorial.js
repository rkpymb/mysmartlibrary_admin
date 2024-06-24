import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}SuperAdmin/search_tutorial`, { 
            token: process.env.MYKEY,
            SearchQuery: req.body.SearchQuery,
          
        
        },).then((response) => {
            const DataMain = response.data;
            res.status(200).json({ ReqD: DataMain })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}