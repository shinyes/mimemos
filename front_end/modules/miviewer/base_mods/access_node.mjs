/*
获取一个元素的所有子孙元素，并且可以给定一个过滤器函数
*/
export function getAllDescendants(element, filter = null) {
    let descendants = [];
    let childs = element.children;

    for (let i = 0; i < childs.length; i++) {
        let child = childs[i];
        if (child.nodeType === 1) { // 检查节点类型是否为元素节点
            // 过滤掉不想要的子元素
            if (filter === null) { // 如果filter为 null ，则无条件加入到子孙元素列表中
                descendants.push(child);
            } else if (filter(child)) {
                descendants.push(child);
            }
            descendants = descendants.concat(getAllDescendants(child, filter)); // 递归调用，获取子元素的子孙元素
        }
    }
    return descendants;
}