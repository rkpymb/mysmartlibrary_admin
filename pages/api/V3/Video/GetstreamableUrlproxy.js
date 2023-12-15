import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
     

        axios.post(`${process.env.API_URL}home/ytvideoinfo`, { token: process.env.MYKEY, videoUrl: req.body.videoUrl}).then((response) => {
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}