export class Webcam {
  private webcamElement: HTMLVideoElement | null;
  private canvasElement: HTMLCanvasElement;

  constructor(
    webcamElement: HTMLVideoElement | null,
    canvasElement: HTMLCanvasElement
  ) {
    this.webcamElement = webcamElement;
    this.canvasElement = canvasElement;
  }

  // adjustVideoSize(width: number, height: number): void {
  //   const aspectRatio = width / height;
  //   if (width >= height) {
  //     this.webcamElement && this.webcamElement.width
  //       ? (this.webcamElement.width = aspectRatio * this.webcamElement.height)
  //       : 0;
  //   } else if (width < height) {
  //     this.webcamElement && this.webcamElement.height
  //       ? (this.webcamElement.height = this.webcamElement.width / aspectRatio)
  //       : 0;
  //   }
  // }

  async setup() {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices.getUserMedia !== undefined) {
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: { facingMode: "environment" } })
          .then((mediaStream) => {
            if (this.webcamElement) {
              if ("srcObject" in this.webcamElement) {
                this.webcamElement.srcObject = mediaStream;
                console.log("here");
              } else {
                // For older browsers withouth the srcObject.
                //this.webcamElement.src = window.URL.createObjectURL(mediaStream);
              }

              this.webcamElement.onloadedmetadata = (e) => {
                this.webcamElement?.play();
              };
            }
          });
      } else {
        reject();
      }
    });
  }

  _drawImage() {
    const imageWidth = this.webcamElement?.videoWidth || 0;
    const imageHeight = this.webcamElement?.videoHeight || 0;

    const context = this.canvasElement.getContext("2d");
    this.canvasElement.width = imageWidth;
    this.canvasElement.height = imageHeight;

    if (this.webcamElement) {
      context?.drawImage(this.webcamElement, 0, 0, imageWidth, imageHeight);
    }

    return { imageHeight, imageWidth };
  }

  takeBlobPhoto() {
    const { imageWidth, imageHeight } = this._drawImage();
    return new Promise((resolve, reject) => {
      this.canvasElement.toBlob((blob) => {
        resolve({ blob, imageHeight, imageWidth });
      });
    });
  }

  takeBase64Photo({ type, quality } = { type: "png", quality: 1 }) {
    const { imageHeight, imageWidth } = this._drawImage();
    const base64 = this.canvasElement.toDataURL("image/" + type, quality);
    return { base64, imageHeight, imageWidth };
  }
}
