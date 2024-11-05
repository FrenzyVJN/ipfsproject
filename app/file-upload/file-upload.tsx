"use client";
import { useState, useCallback, useEffect } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Check, AlertCircle, Wallet } from "lucide-react";
import { ethers, JsonRpcProvider } from "ethers";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      setProvider(providerInstance);
    }
  }, []);
  var accounts;

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install a MetaMask wallet to use this feature.");
    }
  };
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const addFile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!file) return;

    const targetBtn = e.currentTarget;
    targetBtn.disabled = true;
    setUploadStatus("uploading");

    // const formData = new FormData();
    // // upload the file

    console.log("Adding file to IPFS");
    var response;
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (walletAddress) {
        formData.append("address", walletAddress);
      }
      response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });
      console.log("upload successful");
      if (response.ok) {
        console.log(response);
        const data = await response.json();
        setIpfsHash(data.cid);
        console.log(ipfsHash);
        setUploadStatus("success");
        try {
          // const provider = new JsonRpcProvider("https://polygon-amoy.blockpi.network/v1/rpc/public");
          // const accounts = await provider.send("eth_requestAccounts", []);
          // setWalletAddress(accounts[0]);
          const contractAddress = "0xBf46CAD5708c99142798B054020C3E1ACCB91D8B"; // Replace with your deployed contract address
          const contractABI = [
            {
              "type": "function",
              "name": "addCid",
              "inputs": [{ "name": "cid", "type": "string", "internalType": "string" }],
              "outputs": [],
              "stateMutability": "nonpayable"
            },
            {
              "type": "function",
              "name": "clearCids",
              "inputs": [],
              "outputs": [],
              "stateMutability": "nonpayable"
            },
            {
              "type": "function",
              "name": "listCids",
              "inputs": [],
              "outputs": [
                { "name": "", "type": "string[]", "internalType": "string[]" }
              ],
              "stateMutability": "view"
            },
            {
              "type": "function",
              "name": "removeCid",
              "inputs": [{ "name": "cid", "type": "string", "internalType": "string" }],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
          ]

          if (!provider) {
            throw new Error("Provider is not available");
          }
          const signer = await provider.getSigner();
          console.log(signer);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          const txResponse = await contract.addCid(data["cid"], {
            gasLimit: 300000, // adjust as needed
          }); // This returns a transaction response object

          // Wait for the transaction to be confirmed
          const receipt = await txResponse.wait();

          // await signer.sendTransaction(tx);
        } catch (error) {
          console.log(error);
        }

        setUploadStatus("success");
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      setUploadStatus("error");
    } finally {
      targetBtn.disabled = false;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload to IPFS</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Wallet Connection */}
        <div className="mb-4 flex items-center justify-between">
          <Button onClick={connectWallet} variant="secondary">
            <Wallet className="mr-2" />{" "}
            {walletAddress ? "Connected" : "Connect Wallet"}
          </Button>
          {walletAddress && (
            <p className="text-sm text-gray-600">
              Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          )}
        </div>

        {/* Drag-and-Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {file ? (
            <div className="text-sm">{file.name}</div>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your file here, or click to select a file
              </p>
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          id="fileInput"
          className="hidden"
        />

        {/* Upload Button */}
        <Button
          className="mt-4 w-full"
          onClick={addFile}
          disabled={!file || uploadStatus === "uploading" || !walletAddress}
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload to IPFS"}
        </Button>
        <div className="text-[10px]">You need metamask wallet to connect to the blockchain</div>

        {/* Upload Status */}
        {uploadStatus === "success" && (
          <div className="mt-2 text-green-600 flex-col flex">
            <Check className="mr-2 flex items-center justify-center" /> File
            uploaded successfully
            <div>
              <p>IPFS Hash: {ipfsHash}</p>
            </div>
          </div>
        )}
        {uploadStatus === "error" && (
          <div className="mt-2 text-red-600 flex items-center justify-center">
            <AlertCircle className="mr-2" /> Error uploading file
          </div>
        )}
      </CardContent>
    </Card>
  );
}
