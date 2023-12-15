import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/EditVideo`, {
            token: process.env.MYKEY,
            catid: req.body.catid,
            subcatid: req.body.subcatid,
            title: req.body.title,
            details: req.body.details,
            img: req.body.img,
            Videoid: req.body.Videoid,
            VideoType: req.body.VideoType,
            isActive: req.body.isActive,
            isFree: req.body.isFree,
            mprice: req.body.mprice,
            sprice: req.body.sprice,
            id: req.body.id,
          

        },
            { headers }).then((response) => {
                console.log(response.data.MYTSData)
                res.status(200).json({ ReqData: response.data });
            });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}