class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }
}

class Coordinate {
  value: Point;
  children: Point[];

  constructor(value: Point, children: Point[]) {
    this.value = value;
    this.children = children;
  }

  clone(): Coordinate {
    return new Coordinate(
      this.value.clone(),
      JSON.parse(JSON.stringify(this.children)),
    );
  }
}

(() => {
  const p1 = new Point(1, 2);
  const p2 = p1.clone();

  p1.x = 3;

  console.log(p1, p2);

  const c1 = new Coordinate(p1, [new Point(1, 2), new Point(2, 3)]);

  const c2 = c1.clone();

  c1.children.at(0).x = 10;

  console.log(c1.children.at(0).x, c2.children.at(0).x);
})();
