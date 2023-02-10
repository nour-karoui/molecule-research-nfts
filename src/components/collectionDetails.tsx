import {useState, FC} from "react";
import {ipfs} from "../services/uploadIPFS";

export const CollectionDetails: FC<{}> = () => {
    const [uploadedImages, setUploadedImages] = useState<{cid: any, path: string}[]>([]);

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        const form = event.target;
        const result = await ipfs.add(JSON.stringify({hello: 'world'}));

        setUploadedImages([
            ...uploadedImages,
            {
                cid: result.cid,
                path: result.path,
            },
        ]);

        form.reset();
    };
    return (
        <div>
            <div className="app">
                <div className="app__container">
                    {ipfs ? (
                        <div className="container">
                            <h1>IPFS uploader</h1>
                            <form onSubmit={onSubmitHandler}>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Select File
                                </label>
                                <input id="file-upload" type="file" name="file"/>
                                <button className="button" type="submit">
                                    Upload file
                                </button>
                            </form>
                        </div>
                    ) : null}
                    <div className="data">
                        {uploadedImages.map((image, index) => (
                            <>
                                <img
                                    className="image"
                                    alt={`Uploaded #${index + 1}`}
                                    src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
                                    style={{maxWidth: "400px", margin: "15px"}}
                                    key={image.cid.toString() + index}
                                />
                                <h4>Link to IPFS:</h4>
                                <a href={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}>
                                    <h3>{"https://skywalker.infura-ipfs.io/ipfs/" + image.path}</h3>
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}