import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/CreateLibrarySubscription`, {
            token: process.env.MYKEY,
            PassData : req.body.PassData,
            SeatData : req.body.SeatData,
            AddonsData : req.body.AddonsData,
            ShiftData : req.body.ShiftData,
            UserData : req.body.UserData,
            DateValue : req.body.DateValue,
            


        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}