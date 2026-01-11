"use server";

// import { serverClient } from "@/sanity/serverClient";
import { createClient } from "next-sanity";

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // console.log({ formData });

    // Validate the required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Create the document in Sanity
    const result = await serverClient.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Failed to submit the form. Please try again later.",
    };
  }
}
