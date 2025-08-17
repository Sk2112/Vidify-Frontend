import { useState } from "react";
import { Button, Progress } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { FileUpload } from "../components/file-uplaod";
 import SittingGirl from "../assets/sitting-Girl.jpg"
import { Text } from "../components/Text";
import { Loader } from "../components/loader";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUpLoading] = useState(false);
  const [meta, setMeta] = useState({ title: "", description: "" });

  const formFieldChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setMeta({ title: "", description: "" });
    setSelectedFile(null);
    setUpLoading(false);
    setProgress(0);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a video file.");
      return;
    }
    saveVideoToServer(selectedFile, meta);
  };

  async function saveVideoToServer(video, videoMetaData) {
    setUpLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);

      await axios.post("http://localhost:8080/api/v1/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (pe) => {
          if (pe.total) {
            const percent = Math.round((pe.loaded * 100) / pe.total);
            setProgress(percent);
          }
        },
      });

      toast.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Video upload failed!");
    } finally {
      setUpLoading(false);
    }
  }
  console.log("Progress :"+progress);
return (
  <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#2C3E50] to-[#FD746C]">
    {/* Header */}
      <div className="py-6 flex justify-center  w-full">
    <Text className="sm:text-center  p-2 cursor-default"/>
    </div>

   

    {/* Main Content */}
    <div className="flex flex-1 items-center justify-around px-4 sm:px-6 lg:px-8 cursor-default">
      {/* Card */}
      <div className="shadow-lg border-r-2  border-l-2 p-4 w-full max-w-md  rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6  ">
          Upload Your Video
        </h1>
        <form noValidate onSubmit={handleForm} className="space-y-6">
          {/* Title */}
          <div >
            {/* <Label htmlFor="title" value="Video Title" /> */}
            <input
              id="title"
              value={meta.title}
              onChange={formFieldChange}
              name="title"
              placeholder="Enter title"
              required
              shadow
              className=" w-full p-2 text-white  outline-none hover:border-b-1 text-center"
            />
          </div>

          {/* Description */}
          <div  className="">
            {/* <Label htmlFor="description" value="Video Description" /> */}
            <input
              id="description"
              value={meta.description}
              onChange={formFieldChange}
              name="description"
              placeholder="Write video description..."
              className="w-full p-1 text-white outline-none text-center hover:border-b-1 "
              required
              rows={4}
              shadow
            />
          </div>

          {/* File Upload */}
          <FileUpload onChange={(file) => setSelectedFile(file)} />

          {/* Progress */}
         {uploading && <Loader progress={progress} />}
         

          {/* Submit */}



         {selectedFile && <div className="flex justify-center">
            <Button
    type="submit"
    gradientDuoTone="purpleToBlue"
    disabled={uploading}
    className="h-13"
  >
    {uploading ? `Uploading...` : "Upload Video"}
  </Button>
         </div>}



        </form>
      </div>

      {/* Image */}
      <div className="hidden md:flex justify-center ">
        <img
          src={SittingGirl}
          alt="Sitting Girl"
          className="w-[750px] h-auto drop-shadow-2xl animate-float"
        />
      </div>
    </div>
  </div>
);

 
};

export default VideoUpload;
