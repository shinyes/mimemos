/* 下面三行用于获取当前脚本的目录 */
const currentScriptUrl = import.meta.url;
const curr_script_path = new URL(currentScriptUrl).pathname;
const curr_script_dir_path = curr_script_path.substring(0, curr_script_path.lastIndexOf('/'));

// mivd_container 是在一个网页中式唯一的，当点击视频后，弹出，并播放
let mivd_container = document.createElement('div')
mivd_container.id = 'mivd-container'
document.body.appendChild(mivd_container)

// 这个元素放在 mivd_container 的右上角，点击之后关闭 mivd_container
let stop_mivd_btn = document.createElement('span')
stop_mivd_btn.id = 'stop-mivd-btn'
stop_mivd_btn.textContent = '⏹️'
mivd_container.appendChild(stop_mivd_btn)

stop_mivd_btn.addEventListener('click', close_mivd_container)

/*
下面三个变量用于存储将要播放的视频的相关元素，因为打开 mivd_container 之后
会讲视频元素添加为 mivd_container 的子元素，关闭 mivd_container 之后又需要放回去，
所以需要记录
*/
let resc; // 放置视频元素的容器
let video_to_be_play; // 将要放到 mivd_container 中播放的视频
let play_icon_of_video_to_be_play; // 播放示意图标

/* 
此函数用于给一个容器施加添加点击后弹出播放界面的功能
*/
export function add_mivd(element) {
    let play_icon = document.createElement('img')
    play_icon.classList.add('mivd-play-icon')
    play_icon.setAttribute('src', curr_script_dir_path + '/' + './css_js/mivd/play.svg')
    element.appendChild(play_icon)

    element.addEventListener('click', () => {
        resc = element
        play_icon_of_video_to_be_play = element.querySelector('.mivd-play-icon')
        mivd_container.style.display = 'block'
        play_icon_of_video_to_be_play.style.display = 'none'
        let video = element.querySelector('video')
        video.setAttribute('controls', 'true')
        resc.removeChild(video)
        video_to_be_play = video;
        mivd_container.appendChild(video)
    })
}

/* 
此函数用于关闭播放界面 mivd_container
*/
function close_mivd_container() {
    mivd_container.removeChild(video_to_be_play)
    video_to_be_play.removeAttribute('controls', 'false')
    video_to_be_play.pause()
    play_icon_of_video_to_be_play.style.display = 'block'
    mivd_container.style.display = 'none'
    resc.appendChild(video_to_be_play)
}

/* 
    实现在弹出 mivd_container 时，按下 ESC 键就关闭弹出的界面
*/
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && mivd_container.style.display == 'block') {
        close_mivd_container()
    }
});

// // 使用这个库的示例
// add_mivd(document.querySelector('.resc.mivd'))