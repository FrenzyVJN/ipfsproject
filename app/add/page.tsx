'use client'
export default function AddFile() {
    const addFile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = document.getElementById('sadfile') as HTMLInputElement;
        const file = input.files?.item(0);
        if (!file) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);

        console.log("Adding file to IPFS");
        const response = await fetch("/api/add", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Successfully added file to IPFS:", data);
        } else {
            console.error("Failed to add file to IPFS:", response.statusText);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            Upload a file to IPFS
            <input type="file" id="sadfile" />
            <button className="bg-[#000] text-[#fff] px-4 py-2 rounded-md" onClick={addFile}>Add</button>
        </div>
    );
}
