import { useState } from 'react';
import { uploadFileToBlockchain } from '../../utils/eth';

const UploadPage = () => {
    const [cid, setCid] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const receipt = await uploadFileToBlockchain(cid);
            console.log('Transaction receipt:', receipt);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (
        <div>
            <h1>Upload File to Blockchain</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    placeholder="Enter your IPFS CID"
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadPage;
