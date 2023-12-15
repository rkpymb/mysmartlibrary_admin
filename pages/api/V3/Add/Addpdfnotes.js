import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/Addpdfnotes`, { 
            token: process.env.MYKEY,
            pid: req.body.pid,
            chapterid: req.body.chapterid,
            title: req.body.title,
            details: req.body.details,
            file: req.body.file,
            isActive: req.body.isActive
            
            }, 
            
            { headers }).then((response) => {
          
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}