import FileUpload from './file-upload'
import FileFetch from './file-fetch'

export default function IPFSPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">IPFS Portal</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <FileUpload />
          <FileFetch />
        </div>
      </div>
    </div>
  )
}