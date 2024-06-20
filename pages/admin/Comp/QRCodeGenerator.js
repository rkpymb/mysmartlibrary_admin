// components/QRCodeGenerator.js

import { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';


import MYS from '/Styles/mystyle.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { LuDownload  } from "react-icons/lu";

const QRCodeGenerator = ({ qrValue,webid }) => {
  const qrRef = useRef();
  const hiddenQrRef = useRef();

  const downloadQRCode = () => {
    const canvas = hiddenQrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${webid}_attendace_qr.png`;
    a.click();
  };

  return (
    <div className={MYS.QRCodeBox}>
      <h3>Attendace QR Code</h3>
      {qrValue && (
        <div>
          <div ref={qrRef}>
            <QRCode value={qrValue} size={150} />
          </div>
          <div style={{ display: 'none' }} ref={hiddenQrRef}>
            <QRCode value={qrValue} size={500} />
          </div>
          <LoadingButton
            size="small"
            startIcon={<LuDownload  />}
            onClick={downloadQRCode}
            loading={false}
            loadingPosition="end"
            variant="contained"
          >
            <span>Download QR Code</span>
          </LoadingButton>
          <div style={{height:'10px'}}></div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
