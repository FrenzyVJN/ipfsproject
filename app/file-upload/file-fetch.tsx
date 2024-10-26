'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Check, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function FileFetch() {
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle')
  const [fileInfo, setFileInfo] = useState<any>(null)

  const fetchFile = async () => {
    setFetchStatus('fetching')
    console.log("Fetching file from IPFS");
    try {
      const response = await fetch("/api/fetchfile"
        ,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hash: fileInfo.hash })
        }
      );
      const result = await response.json();
      console.log(result);
      setFileInfo(result)
      setFetchStatus('success')
    } catch (error) {
      console.error("Error fetching file:", error)
      setFetchStatus('error')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Fetch from IPFS</CardTitle>
      </CardHeader>
    <CardContent>
      <Input
        type="text"
        placeholder="Enter IPFS hash"
        className="w-full mb-4"
        onChange={(e: { target: { value: any } }) => setFileInfo({ ...fileInfo, hash: e.target.value })}
      />
    </CardContent>
      <CardContent>
        <Button
          className="w-full"
          onClick={fetchFile}
          disabled={fetchStatus === 'fetching'}
        >
          {fetchStatus === 'fetching' ? 'Fetching...' : 'Fetch File from IPFS'}
        </Button>
        {fetchStatus === 'success' && fileInfo && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-600 mb-2">
              <Check className="mr-2" /> File fetched successfully
            </div>
            <div className="text-sm">
              <p><strong>Name:</strong> {fileInfo.name}</p>
              <p><strong>Size:</strong> {fileInfo.size} bytes</p>
              <p><strong>IPFS Hash:</strong> {fileInfo.hash}</p>
            </div>
          </div>
        )}
        {fetchStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center text-red-600">
            <AlertCircle className="mr-2" /> Error fetching file
          </div>
        )}
      </CardContent>
    </Card>
  )
}