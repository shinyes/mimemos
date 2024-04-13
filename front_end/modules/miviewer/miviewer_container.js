/* 下面三行用于获取当前脚本的目录 */
const currentScriptUrl = import.meta.url;
const curr_script_path = new URL(currentScriptUrl).pathname;
const curr_script_dir_path = curr_script_path.substring(0, curr_script_path.lastIndexOf('/'));


/* miviewer_container 是在一个网页中式唯一的，当点击视频后，弹出，并播放 */
export let miviewer_container = document.createElement('div')
miviewer_container.id = 'miviewer-container'

/* 创建顶部条、展览框和底部阅览条的元素 */
let top_bar = document.createElement('div')
top_bar.id = 'top-bar'
miviewer_container.appendChild(top_bar)

/* 创建浏览进度 */
export let browsing_progress = document.createElement('div')
browsing_progress.id = 'browsing-progress'
top_bar.appendChild(browsing_progress)


/* 这个元素放在 miviewer_container 的右上角，点击之后关闭 miviewer_container */
export let close_miviewer_btn = document.createElement('img')
close_miviewer_btn.src = curr_script_dir_path + '/' + 'assets/times.svg'
close_miviewer_btn.id = 'close-miviewer'
top_bar.appendChild(close_miviewer_btn)

// 创建中间容器
let mid_bar = document.createElement('div')
mid_bar.id = 'mid-bar'
miviewer_container.appendChild(mid_bar)

let left_column = document.createElement('div')
left_column.id = 'left-column'
mid_bar.appendChild(left_column)

export let showcase = document.createElement('div')
showcase.id = 'showcase'
mid_bar.appendChild(showcase)

let right_column = document.createElement('div')
right_column.id = 'right-column'
mid_bar.appendChild(right_column)

let btm_bar = document.createElement('div')
btm_bar.id = 'btm-bar'
miviewer_container.appendChild(btm_bar)

export let angle_left = document.createElement('img')
angle_left.id = 'angle-left'
angle_left.src = curr_script_dir_path + '/' + 'assets/angle-left.svg'
export let angle_right = document.createElement('img')
angle_right.id = 'angle-right'
angle_right.src = curr_script_dir_path + '/' + 'assets/angle-right.svg'
left_column.appendChild(angle_left)
right_column.appendChild(angle_right)