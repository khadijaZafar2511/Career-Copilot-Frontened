import { useState, useRef} from "react";
import { Send, Upload, Link, FileText, CheckCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submissionSchema } from "../../../lib/validations/Submission"
import { useSubmitProject } from "@/Features/Projects/Project.mutation";
import { useRequireAuth } from "@/hooks/use-require-auth"
export default function SubmissionComponent({ projectId }) {
  // console.log(projectId)
  const [data,setData]=useState("")
  const [submissionType, setSubmissionType] = useState("link");
  const {enforceAuth}=useRequireAuth()
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm({ resolver: zodResolver(submissionSchema) });
  const fileInputRef = useRef(null);
    const watchedFile = watch("file");
    const [file, setFile] = useState(null);
    const {mutate,data:submissionData,isLoading}=useSubmitProject()

     const handleUploadClick = () => {
      fileInputRef.current.click();
    };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(e.target.files[0]);
    if (selectedFile) {
      // console.log("selected", selectedFile)
      setFile(selectedFile);
      setValue("file", selectedFile, { shouldValidate: true });
    }
  }
  
  const onSubmit = (data) => {
   console.log(data)
     const formData = new FormData();

     // 1. Append regular text fields
     formData.append("submissionTitle", data.submissionTitle);
     formData.append("description", data.description);

     if (data.url) formData.append("url", data.url);
     if (data.notes) formData.append("notes", data.notes);

     // 2. Extract and append the single File object safely
     let finalFile = null;
     if (data.file instanceof FileList && data.file.length > 0) {
       finalFile = data.file[0];
     } else if (data.file instanceof File) {      
       finalFile = data.file;
     }

     if (finalFile) {
       // Make sure the key matches what your backend parser expects (e.g., "file")
       formData.append("file", finalFile);
      //  console.log(formData)

     }
    mutate(
      { projectId,formData},
      {
        onSuccess: (data1) => {
          console.log(data1, "backene");
        },
      },
    );
}
const onError = (errors) => {
  // console.log("❌ Validation Failed:", errors);
  };
  

    // const { ref: registerRef, ...file1 } = register("file");

  return (
    <div className=" border w-full max-w-5xl lg:max-w-6xl  mx-auto p-3 space-y-6">
      {/* HEADER */}
      <div className="border rounded-2xl p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Send className="w-6 h-6" />
          Project Submission
        </h2>
        <p className="text-slate-500 mt-1">
          Submit your project work, links, or files for review.
        </p>
      </div>

      {/* SUBMISSION TYPE SWITCH */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubmissionType("link")}
          className={`px-4 py-2 rounded-lg border ${
            submissionType === "link" ? "bg-gray-200 " : "hover:bg-slate-100"
          }`}
        >
          <Link className="inline w-4 h-4 mr-2" />
          Link
        </button>

        <button
          onClick={() => setSubmissionType("file")}
          className={`px-4 py-2 rounded-lg border ${
            submissionType === "file" ? "bg-gray-200" : "hover:bg-slate-100"
          }`}
        >
          <Upload className="inline w-4 h-4 mr-2" />
          File Upload
        </button>
      </div>

      {/* FORM AREA */}
      <form onSubmit={enforceAuth(handleSubmit(onSubmit, onError))}>
        <div className=" md:p-6  py-6  text-black  bg-white space-y-5">
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Submission Title</label>
            <input
              type="text"
              placeholder="e.g. HTML & CSS Project"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              {...register("submissionTitle")}
            />
            <p className="text-red-500 text-sm">
              {errors.submissionTitle?.message}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              placeholder="Explain what you built..."
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              {...register("description")}
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          {/* CONDITIONAL INPUT */}
          {/* CONDITIONAL INPUT */}
          {submissionType === "link" ? (
            <div>
              <label className="text-sm font-medium">Project Link</label>
              <input
                type="url"
                placeholder="https://github.com/your-repo"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                {...register("url")}
              />
              <p className="text-red-500 text-sm">{errors.url?.message}</p>
            </div>
          ) : (
            <div>
              <input
                type="file"
                className="hidden"
                // 1. Pass down React Hook Form's registration rules
                {...register("file")}
                // 2. Override ref and onChange to work with your custom UI
                ref={(e) => {
                  register("file").ref(e); // Syncs React Hook Form ref
                  fileInputRef.current = e; // Syncs your custom ref
                }}
                onChange={handleFileChange}
              />
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition"
              >
                <Upload className="mx-auto w-6 h-6 text-slate-500" />

                {/* 3. Use watchedFile instead of local state file variable */}
                {watchedFile ? (
                  <p className="mt-2 text-green-600 font-medium">
                    Selected: {watchedFile.name}
                  </p>
                ) : (
                  <p className="text-slate-500 mt-2">Click to upload file</p>
                )}
              </div>
              {/* 4. Display the Zod error message if the file validation fails */}
              <p className="text-red-500 text-sm mt-1">
                {errors.file?.message}
              </p>
            </div>
          )}

          {/* EXTRA NOTE */}
          <div>
            <label className="text-sm font-medium">Notes (optional)</label>
            <textarea
              rows={3}
              placeholder="Any challenges or comments..."
              className="w-full mt-1 p-3 border rounded-lg"
              {...register("notes")}
            />
            <p className="text-red-500 text-sm">{errors.notes?.message}</p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-foreground text-white py-3 rounded-md  transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
}
