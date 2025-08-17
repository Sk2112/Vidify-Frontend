import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

export const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);

  const onDrop = (accepted) => {
    setFiles(accepted);
    if (onChange && accepted.length) onChange(accepted[0]); 
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "video/*": [] },
    onDrop,
  });

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        whileHover="animate"
        className="p-7 rounded-lg cursor-pointer w-full relative overflow-hidden bg-gray-50 dark:bg-neutral-900 shadow-lg hover:border-r-2 hover:border-r-white hover:border-l-2 hover:border-l-white"
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center  ">
          <p className="font-bold text-neutral-700 dark:text-neutral-300 text-lg ">
            Upload Video
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            Drag & drop or click to select a video file
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 ? (
              <motion.div
                layoutId="file-upload"
                className="bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 w-full mx-auto rounded-md shadow-sm"
              >
                <div className="flex justify-between w-full items-center gap-4  text-gray-400">
                  <motion.p className="text-base truncate max-w-xs">
                    {files[0].name}
                  </motion.p>
                  <motion.p className="rounded-lg px-2 py-1 text-sm bg-gray-200 dark:bg-neutral-800">
                    {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>
                <div className="flex text-sm items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                  <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                    {files[0].type || "video"}
                  </motion.p>
                  <motion.p>
                    modified {new Date(files[0].lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow"
              >
                {isDragActive ? (
                  <motion.p className="flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-6 w-6 text-neutral-600" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
