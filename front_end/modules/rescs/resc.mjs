const currentScriptUrl = import.meta.url;
const curr_script_path = new URL(currentScriptUrl).pathname;
const curr_script_dir_path = curr_script_path.substring(0, curr_script_path.lastIndexOf('/'));

export function create_resc(type, src) {
    let resc;

    if (type === 'image') {
        resc = create_resc_img(src)
    } else if (type === 'video') {
        resc = create_resc_video(src)
    }

    let del_resc_btn = document.createElement('img')
    del_resc_btn.classList.add('del-resc-btn')
    del_resc_btn.src = curr_script_dir_path + '/' + './assets/cross-circle.svg'
    attach_del_a_resc_listener(resc, del_resc_btn)
    resc.appendChild(del_resc_btn)
    return resc
}

function create_resc_img(src) {
    let resc = document.createElement('div')
    resc.classList.add('resc')

    let rsec_img = document.createElement('img')
    rsec_img.classList.add('miviewer-item')
    resc.appendChild(rsec_img)
    rsec_img.src = src
    rsec_img.draggable = 'false'
    return resc
}

function create_resc_video(src) {
    let resc = document.createElement('div')
    resc.classList.add('resc')
    let resc_video = document.createElement('video')
    resc_video.classList.add('miviewer-item')
    resc.appendChild(resc_video)

    // 添加视频片段
    let src_elem = document.createElement('source')
    src_elem.src = src
    resc_video.appendChild(src_elem)

    return resc
}

function attach_del_a_resc_listener(resc, del_resc_btn) {
    del_resc_btn.addEventListener('click', e => {
        resc.remove()
    })
}
