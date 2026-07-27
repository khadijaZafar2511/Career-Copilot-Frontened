import * as z from "zod";

// 1. Define constants for file constraints
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/jpg",
];

const submissionSchema = z
  .object({
    submissionTitle: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),

    // Optional initially, but validated if filled out
    url: z
      .url("Invalid URL format") // Built-in Zod URL string validation
      .includes("github.com", { message: "Only GitHub URLs are allowed" }) // String method
      .or(z.literal("")) // Put the .or() at the absolute end of the chain
      .optional(),

    // Validates standard browser File object metadata
    file: z
      .instanceof(File, { message: "Please select a valid file." })
      .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        "Only .jpg, .png, and .pdf formats are supported",
      )
      .optional(),

    notes: z
      .string()
      .trim()
      .max(500, "Notes cannot exceed 500 characters")
      .optional(),
  })
  // 2. Enforce that either 'url' OR 'file' must be provided
  .refine(
    (data) => {
      const hasUrl = data.url && data.url.trim() !== "";
      const hasFile = !!data.file;
      return hasUrl || hasFile;
    },
    {
      message: "You must provide either a valid URL or upload a file",
      path: ["url"], // Highlights the URL field in form UI errors
    },
  );

export { submissionSchema };


  // {...register("file", {
  //   validate: {
  //     required: files => files && files[0] ? true : "Please select a valid file.",
  //     acceptedFormats: files => ['image/jpeg', 'image/png'].includes(files[0]?.type) || "Invalid format"
  //   }