'use client'
import { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Check, AlertCircle, Wallet } from 'lucide-react';
import { ethers } from 'ethers';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
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

  const addFile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!file) return;
    
    const targetBtn = e.currentTarget;
    targetBtn.disabled = true;
    setUploadStatus('uploading');
    
    const formData = new FormData();
    formData.append("file", file);

    console.log("Adding file to IPFS");
    try {    
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
      },  
        body: JSON.stringify({
          file: file,
          address: walletAddress
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIpfsHash(data["IpfsHash"]);
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      setUploadStatus('error');
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
            <Wallet className="mr-2" /> {walletAddress ? 'Connected' : 'Connect Wallet'}
          </Button>
          {walletAddress && (
            <p className="text-sm text-gray-600">Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
          )}
        </div>

        {/* Drag-and-Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          {file ? (
            <div className="text-sm">{file.name}</div>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag and drop your file here, or click to select a file</p>
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
          disabled={!file || uploadStatus === 'uploading' || !walletAddress}
        >
          {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload to IPFS'}
        </Button>

        {/* Upload Status */}
        {uploadStatus === 'success' && (
          <div className="mt-2 text-green-600 flex-col flex">
            <Check className="mr-2 flex items-center justify-center" /> File uploaded successfully
            <div>
              <p>IPFS Hash: {ipfsHash}</p>
            </div>
          </div>
        )}
        {uploadStatus === 'error' && (
          <div className="mt-2 text-red-600 flex items-center justify-center">
            <AlertCircle className="mr-2" /> Error uploading file
          </div>
        )}
      </CardContent>
    </Card>
  );
}
