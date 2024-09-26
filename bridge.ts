abstract class Shape {
  constructor(protected color: Color) {
    this.color = color;
  }
  abstract getInfo(): string;
}

class Circle extends Shape {
  getInfo(): string {
    const color = this.color.getName();
    return `This ${Circle.name} with color ${color}`;
  }
}

class Square extends Shape {
  getInfo(): string {
    const color = this.color.getName();
    return `This ${Square.name} with color ${color}`;
  }
}

interface Color {
  getName(): string;
}

class Red implements Color {
  getName(): string {
    return Red.name;
  }
}

class Blue implements Color {
  getName(): string {
    return Blue.name;
  }
}

(() => {
  let color = new Red();
  let circle = new Circle(color);
  let square = new Square(color);
  console.log(circle.getInfo());
  console.log(square.getInfo());

  console.log('');

  color = new Blue();
  circle = new Circle(color);
  square = new Square(color);
  console.log(circle.getInfo());
  console.log(square.getInfo());
})();
