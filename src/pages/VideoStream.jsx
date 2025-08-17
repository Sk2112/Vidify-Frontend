"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import VideoStreamingPerson from '../assets/image1.png'
import axios from "axios";
import { Play, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import NothingShow from "../assets/Nothing.png"
import { Link } from "react-router-dom";

export default function VideoStream() {
  const [videos, setVideos] = useState([]);
   const [selectedVideo, setSelectedVideo] = useState(null);


   // getting all the videos from the backend
 useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/videos") 
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);


 const deleteVideo = async (videoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/videos/${videoId}` 
      );

      if (response.status === 200) {
        console.log("Deleted video:", response.data);
        toast.success(`Deleted: ${response.data.description}`);
      } else if (response.status === 204) {
        console.log("Video deleted successfully");
        toast.success("Video deleted successfully");
      }

      // refresh UI after deletion
      setVideos((prev) => prev.filter((v) => v.videoId !== videoId));
    } catch (error) {
      console.error("Error deleting video", error);
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="bg-black border  ">
    <div
      className="relative  mx-auto my-10 flex max-w-7xl flex-col items-center justify-center bg-black ">
      <div
        className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Welcome to Video Streaming Area"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
         Select your favorite video from our curated list to enjoy a seamless viewing experience — simply choose, click, and start watching in high quality right here
        </motion.p>
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-15 rounded-3xl border-neutral-200 bg-neutral-100 p-4 shadow-md dark:bg-neutral-900 w-full"
        >
          <div className="w-full overflow-hidden rounded-xl border-white">
            {selectedVideo ? (
              <video
                src={`http://localhost:8080/api/v1/videos/stream/range/${selectedVideo}`}
                className="w-full h-full aspect-[16/9] object-cover p-2"
                controls
                autoPlay
              />
            ) : (
              <p className="text-center text-gray-400 py-7 border-2 border-rose-400 rounded-xl">
                🎬 Select a video to play
              </p>
            )}
          </div>
        </motion.div>


{/* // List with Heading  */}
<div>
   <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl dark:text-slate-30 mt-10">
          {"Videos List"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>



        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-15 rounded-3xl border-neutral-200 bg-neutral-100 p-4 shadow-md dark:bg-neutral-900 w-full"
        >
          <div className="w-full overflow-hidden text-center">

             {/* table starts here */}
            {videos.length >0 ? (<table className="text-white font-bold w-full border bg-gray-800 hover:bg-gray-700 cursor-default">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-2 border">Serial No.</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Controls</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={video.videoId}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{video.title || "No Title"}</td>
                    <td className="p-2 border">
                      {video.description || "No description"}
                    </td>
                    <td className="p-2 border flex justify-evenly ">
                      <button
                      className="cursor-pointer  text-red-500"
                        onClick={() => deleteVideo(video.videoId)}
                      >
                        <Trash2/>
                      </button>
                      <button
className="cursor-pointer  text-blue-400"
                      
                        onClick={() => setSelectedVideo(video.videoId)}
                      >
                        <Play/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>) :(

<div className=" flex  flex-row-reverse bg-black ">
  <div >
  <img src={NothingShow} alt="Nothing Image" width={300}/> 
</div>
<div className="text-white  w-full flex flex-col justify-evenly">
 
   <div className="flex justify-center space-x-3">
   <Link
                to="/upload"
                className="rounded-md border border-gray-400 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Upload Video
              </Link>
   </div>
  </div>
</div>
)}
            {/* table End Here  */}
          </div>
        </motion.div>
</div>

      </div>
    </div>

    </div>
  );
}

