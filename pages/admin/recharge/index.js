import React, { useState, useEffect, useContext } from 'react';


import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter, useParams } from 'next/router'

import PaymentButton from './PaymentButton'
import MYS from '/Styles/mystyle.module.css'
import { LuArrowRight } from "react-icons/lu";
import {

  FormControl,
  TextField,

  styled,

} from '@mui/material';

import SidebarLayout from 'src/layouts/SidebarLayout';


import TitleNav from '../../../src/components/Parts/TitleNav'



function DashboardCrypto() {
  const router = useRouter()
  const [Amount, setAmount] = useState(0);
  const [CreditValue, setCreditValue] = useState(0);

  const [GstAmt, setGstAmt] = useState(0);
  const [GstText, setGstText] = useState('18 % GST');

  ;


  const [Btnloading, setBtnloading] = useState(false);


  const RechargeProceed = async () => {
    if (Amount >= 1) {
      setBtnloading(true)

      const Recharge = {
        amount: Amount,
        CreditValue: CreditValue

      }

      const TaxData = {
        TaxAmt: GstAmt,
        GstText: GstText

      }

      const sendUM = {
        Recharge: Recharge,
        TaxData: TaxData,
      };

      try {
        const response = await fetch("/api/V3/Admin/Credit/CreateOrder", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(sendUM)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const parsed = await response.json();

        if (parsed && parsed.ReqD.done) {

          const OrderData = parsed.ReqD.done

          RazorPayPg(OrderData)


        } else {
          setBtnloading(false)
          alert('Something went wrong try after some time');
        }


      } catch (error) {
        console.error('Error fetching data:', error);

      }

    } else {
      alert('Please enter valid amount')
    }

  }



  const RazorPayPg = async (OrderData) => {

    const amount = OrderData.amt
    const Orderid = OrderData.Orderid

    const orderResponse = await fetch('/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt: Orderid }),
    });

    const order = await orderResponse.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'My Smart Library',

      description: OrderData.OrderTitle,
      order_id: order.id,
      handler: async function (response) {
        const razorpay_payment_id = response.razorpay_payment_id
        const verificationResponse = await fetch('/api/order/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: order.id,
            payment_id: razorpay_payment_id,
            signature: response.razorpay_signature,
            Orderid: Orderid,
          }),
        });

        const verificationResult = await verificationResponse.json();
        if (verificationResult.verified) {
          setBtnloading(true);
          router.push('/admin/credits')

        } else {
          setBtnloading(false);
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: OrderData.UserData.name,
        email: OrderData.UserData.email,
        contact: OrderData.mobile,
      },
      notes: {
        Type: 'Web_Credit_Recharge',
        Orderid: Orderid,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    setBtnloading(false);
  };
  const ChangeAmt = async (Amt) => {
    if (Amt >= 1) {
      setCreditValue(Amt)

      const taxRate = 0.18; // 18% tax rate
      const taxAmount = Amt * taxRate;
      setGstAmt(taxAmount.toFixed(2))

    }

  }


  useEffect(() => {
    const { amt } = router.query
    if (amt) {
      setAmount(amt)
      ChangeAmt(amt)
    }


  }, [router.query])

  return (
    <>
      <TitleNav Title={`Credit Recharge`} />
      <div className={MYS.MboxMain}>
        <div className={MYS.RechargeBox}>
          <div className={MYS.Formbox}>
            <form onSubmit={RechargeProceed} >
              <div className={MYS.RechargeBoxHeader}>
                <span>Enter Amount to Add Credit</span>
                <div style={{ height: '5px' }}></div>
                <small>Credits can be used for Purchage of Subscription or Portal Functionality Fee. </small>
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Enter Amount"
                  type='Number'
                  inputProps={{ inputMode: 'numeric' }}
                  fullWidth
                  value={Amount}
                  onInput={e => setAmount(e.target.value)}
                  onChange={e => ChangeAmt(e.target.value)}
                />
              </div>

              {Amount >= 1 &&

                <div className={MYS.Rbbox}>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>Credit Value</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {CreditValue}</span>
                    </div>
                  </div>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>GST (18.00%)</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {GstAmt}</span>
                    </div>
                  </div>
                  <div className={MYS.RbboxItem}>
                    <div className={MYS.RbboxItemA}>
                      <span>Total Amount *</span>
                    </div>
                    <div className={MYS.RbboxItemB}>
                      <span>₹ {parseInt(Amount) + parseInt(GstAmt)}</span>
                    </div>
                  </div>
                </div>
              }

              <div style={{ height: '25px' }}></div>
              <LoadingButton
                fullWidth
                onClick={RechargeProceed}
                endIcon={<LuArrowRight />}
                loading={Btnloading}
                disabled={Btnloading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Recharge</span>
              </LoadingButton>

            </form>
          </div>
        </div>

      </div>



    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
