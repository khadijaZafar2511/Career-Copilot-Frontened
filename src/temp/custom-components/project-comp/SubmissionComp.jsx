import { useState, useRef} from "react";
import { Send, Upload, Link, FileText, CheckCircle } from "lucide-react";

export default function SubmissionComponent() {
  const [submissionType, setSubmissionType] = useState("link");
  const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    

    const handleUploadClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  return (
    <div className=" border w-full max-w-5xl mx-auto p-3 space-y-6">
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
      <div className="border rounded-2xl p-6 text-black  bg-white space-y-5">
        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Submission Title</label>
          <input
            type="text"
            placeholder="e.g. HTML & CSS Project"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={4}
            placeholder="Explain what you built..."
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* CONDITIONAL INPUT */}
        {submissionType === "link" ? (
          <div>
            <label className="text-sm font-medium">Project Link</label>
            <input
              type="url"
              placeholder="https://github.com/your-repo"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ) : (
          <>
            {" "}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition"
            >
              <Upload className="mx-auto w-6 h-6 text-slate-500" />

              {file ? (
                <p className="mt-2 text-green-600 font-medium">
                  Selected: {file.name}
                </p>
              ) : (
                <p className="text-slate-500 mt-2">Click to upload file</p>
              )}
            </div>
          </>
        )}

        {/* EXTRA NOTE */}
        <div>
          <label className="text-sm font-medium">Notes (optional)</label>
          <textarea
            rows={3}
            placeholder="Any challenges or comments..."
            className="w-full mt-1 p-3 border rounded-lg"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className="w-full bg-foreground text-white py-3 rounded-md  transition flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Submit Project
        </button>
      </div>
    </div>
  );
}
