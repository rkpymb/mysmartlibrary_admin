import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UpdateLibraryBranch`, { 
            token: process.env.MYKEY,
            name: req.body.name,
            Sname: req.body.Sname,
            logo: req.body.logo,
            City: req.body.City,
            Address: req.body.Address,
            State: req.body.State,
            pincode: req.body.pincode,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            GoogleMap: req.body.GoogleMap,
            isActive: req.body.isActive,
            MobileNum: req.body.MobileNum,
            Email: req.body.Email,
            Whatsapp: req.body.Whatsapp,
            id: req.body.id,
        
        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}