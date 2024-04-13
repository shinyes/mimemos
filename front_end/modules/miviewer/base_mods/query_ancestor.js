/* 本函数用于搜索元素 e 的由 ancestor_id 指定的祖先元素 */
export function query_ancestor_by_id(e, ancestor_id) {
    let ancestor = e;
    while (ancestor) {
        // 检查当前祖先元素的 id 是否匹配目标 id
        if (ancestor.id === ancestor_id) {
            return ancestor; // 如果匹配，返回当前祖先元素
        }
        ancestor = ancestor.parentNode; // 否则，继续向上查找祖先元素
    }
    return null; // 如果没有找到匹配的祖先元素，则返回 null
}

/* 本函数用于搜索元素 e 的由 ancestor_name 指定的祖先元素 */
export function query_ancestor_by_class_name(e, class_name) {
    while (e) {
        // 检查当前祖先元素的 id 是否匹配目标 id
        if (e.classList.contains(class_name)) {
            return e; // 如果匹配，返回当前祖先元素
        }
        e = e.parentNode; // 否则，继续向上查找祖先元素
    }
    return null; // 如果没有找到匹配的祖先元素，则返回 null
}