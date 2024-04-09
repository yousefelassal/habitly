import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
    url: import.meta.env.VITE_UPLOADTHING_URL,
})

const UploadIcon = () => {
    return (
        <UploadButton
            endpoint="image"
            appearance={{
                button: "w-full text-[#9FADBC] hover:text-white flex gap-2 rounded-lg text-sm bg-gray-500/60 shadow-sm hover:bg-gray-500/80",
                container: ""
            }}
        />
    )
}

export default UploadIcon