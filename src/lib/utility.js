export const findClosestPoint = (_mouse, rects) => {
  const { point } = rects.reduce(
    (result, rect) => {
      const d = distance(_mouse, rect);
      return d < result.distance ? { distance: d, point: rect } : result;
    },
    { distance: Infinity, point: null }
  );
  return point;
};

const distance = (_mouse, rect) => {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  return Math.sqrt(Math.pow(_mouse[0] - cx, 2) + Math.pow(_mouse[1] - cy, 2));
};

export function isEqualRect(rect1, rect2) {
  return (
    rect1.x === rect2.x &&
    rect1.y === rect2.y &&
    rect1.width === rect2.width &&
    rect1.height === rect2.height
  );
}
