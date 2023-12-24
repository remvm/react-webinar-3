export default function getLastChild(item) {
  let lastChild = null;

  if (item.children && item.children.length > 0) {
    lastChild = item.children[item.children.length - 1];
    return getLastChild(lastChild);
  }

  return item;
}


