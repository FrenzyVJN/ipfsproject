'use client'
export default function Home() {
  const addFile = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetBtn = e.currentTarget;
    targetBtn.disabled = true;
    console.log("Adding file to IPFS");
    const response = await fetch("/api/addtest", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
    });
    targetBtn.disabled = false;
    console.log(response);
    console.log("Successfully added file to IPFS")
  }
  const fetchFile = async () => {
    console.log("Fetching file from IPFS");
    const response = await fetch("/api/fetchfile");
    const result = await response.json();
    console.log(result);
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="bg-[#000] text-[#fff] px-4 py-2 rounded-md" onClick={(e)=>addFile(e)}>Add</button>
      <button className="bg-[#000] text-[#fff] px-4 py-2 rounded-md" onClick={fetchFile}>Get</button>
    </div>
  );
}
