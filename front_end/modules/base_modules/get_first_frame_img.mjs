/*
接受一个视频的文件对象，计算其第一帧的图片，设置指定 img 元素的 src 属性以显示图片，可以设置图片缩小放大比例 ratio
*/
export async function set_first_frame_img(file, img, ratio) {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(file);

    video.onloadedmetadata = function () {
        this.currentTime = 0; // Go to the beginning of the video

        this.onseeked = function () {
            canvas.width = this.videoWidth * ratio;
            canvas.height = this.videoHeight * ratio;
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

            // Convert canvas to image and display it
            img.src = canvas.toDataURL();

            // Clean up
            URL.revokeObjectURL(url);
        };
    };

    video.src = url;
    video.load();
}