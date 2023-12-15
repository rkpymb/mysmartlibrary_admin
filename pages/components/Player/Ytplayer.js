import { useState, useEffect, useContext } from 'react';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import MYS from '../../../Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import Lottie from 'react-lottie'
import * as animationData from '../../../Data/Lottie/videoloading1.json'
const VideoPlayer = ({ Videoid }) => {
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState(`${Videoid}`);

  const [selectedQuality, setSelectedQuality] = useState(0);
  const [FirstTime, setFirstTime] = useState(true);
  const [LoadingVideo, setLoadingVideo] = useState(true);
  const [VideoSource, setVideoSource] = useState({});


  const GetstreamableUrl = async () => {
    const sendUM = { Videoid: Videoid, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Video/CourseVideoStreamableUrl", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((Videoparsed) => {
        console.log(Videoparsed.ReqData)
        if (Videoparsed.ReqData.qualityOptions) {

          const datai = Videoparsed.ReqData.qualityOptions
          if (Videoparsed.ReqData.qualityOptions[0].isLive) {

            const videoSrc = {
              type: "video",
              sources: [
                {
                  src: Videoid,
                  provider: "youtube",

                }
              ]
            };
            setVideoSource(videoSrc);
          } else {

            setVideoSource({
              type: 'video',
              sources: datai.map(item => ({
                src: item.url,
                size: parseInt(item.qualityLabel.replace('p', ''), 10)
              })),
            });
          }

          if (FirstTime) {
            setSelectedQuality(Videoparsed.ReqData.qualityOptions[0].itag)
            setFirstTime(false)
          }


          setTimeout(function () {
            setLoadingVideo(false);
          }, 2000);

        } 

      })
  }

  useEffect(() => {
    GetstreamableUrl()
  }, [Contextdata.IsLogin])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div>
      <div className={MYS.VideoContainer}>
        <div className={MYS.Videoplyrbox}>
          <Plyr source={VideoSource}  />
        </div>
       
       
      </div>


    </div>
  )
}

export default VideoPlayer
