import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { uploadPhoto } from "../../../actions/assessment";
import { addDocument, deleteDocument } from "../../../actions/assessment";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Widget from "../../../components/Widget/Widget";
import { Field } from "redux-form";

const WebcamComponent = ({ assessmentId, uploadPhoto }) => {
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const [file, setFile] = useState(null);
  const [running, setRunning] = useState(false);

  const savePhoto = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setRunning(true);
    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log(assessmentId);
    await uploadPhoto(assessmentId, formData);
    setRunning(false);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const fileNew = dataURLtoFile(imageSrc, "Hello.jpg");
    setFile(fileNew);
  }, [webcamRef, setImgSrc]);

  return (
    <React.Fragment>
      {running ? (
        <h5
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#333",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Attemting to upload photo.<br></br>
          Please don't try to change window or perform any other operation.
        </h5>
      ) : null}

      <form style={{ width: "100%" }} encType='multipart/form-data'>
        <Row style={{ marginTop: "30px" }}>
          <Col sm={12}>
            <Widget
              customDropDown
              title={<p className={"fw-bold"}>Upload Profile Photo</p>}
            >
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <input
                    type='file'
                    id='file'
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <label for='file'>
                    {file ? file.name : "Click to upload photo"}
                  </label>
                </Col>
              </Row>
              <Row style={{ textAlign: "center", marginTop: "20px" }}>
                <Col sm={12} md={12} lg={12}>
                  <Button
                    onClick={(e) => savePhoto(e)}
                    type='submit'
                    color='success'
                    size={"lg"}
                  >
                    Upload
                  </Button>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </form>
      <hr />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={300}
          videoConstraints={videoConstraints}
        />
        <Button
          style={{ marginTop: "30px" }}
          disabled={running}
          color='primary'
          onClick={capture}
        >
          Capture
        </Button>
        {file ? (
          <Button
            style={{ marginTop: "30px" }}
            color='success'
            onClick={savePhoto}
            disabled={running}
          >
            Upload Photo
          </Button>
        ) : null}

        {imgSrc && <img src={imgSrc} />}
      </div>
      <h5
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#333",
          fontSize: "15px",
        }}
      >
        Please click on the capture button to proceed.
      </h5>
    </React.Fragment>
  );
};

export default connect(null, {
  uploadPhoto: uploadPhoto,
})(WebcamComponent);
