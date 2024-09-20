enum OrderStatus {
  Created = 'created',
  Canceled = 'canceled',
  Paid = 'paid',
  Delivered = 'delivered',
  Finished = 'finished',
}

interface IOrderState {
  cancel(): Error;
  pay(): Error;
  deliver(): Error;
  finish(): Error;
  string(): string;
}

const ErrInvalidAction = new Error('Invalid Action');

abstract class OrderState {
  protected order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  protected change(state: IOrderState) {
    this.order.state = state;
    console.log('Order has changed action to:', state.string());
  }
}

class OrderCanceled implements IOrderState {
  cancel(): Error {
    throw ErrInvalidAction;
  }
  pay(): Error {
    throw ErrInvalidAction;
  }
  deliver(): Error {
    throw ErrInvalidAction;
  }
  finish(): Error {
    throw ErrInvalidAction;
  }
  string(): string {
    return OrderStatus.Canceled;
  }
}

class OrderFinished implements IOrderState {
  cancel(): Error {
    throw ErrInvalidAction;
  }
  pay(): Error {
    throw ErrInvalidAction;
  }
  deliver(): Error {
    throw ErrInvalidAction;
  }
  finish(): Error {
    throw ErrInvalidAction;
  }
  string(): string {
    return OrderStatus.Finished;
  }
}

class OrderCreated extends OrderState implements IOrderState {
  cancel(): Error {
    this.change(new OrderCanceled());
    return null;
  }
  pay(): Error {
    this.change(new OrderPaid(this.order));
    return null;
  }
  deliver(): Error {
    throw ErrInvalidAction;
  }
  finish(): Error {
    throw ErrInvalidAction;
  }
  string(): string {
    return OrderStatus.Created;
  }
}

class OrderPaid extends OrderState implements IOrderState {
  cancel(): Error {
    throw ErrInvalidAction;
  }
  pay(): Error {
    throw ErrInvalidAction;
  }
  deliver(): Error {
    this.change(new OrderDelivered(this.order));
    return null;
  }
  finish(): Error {
    throw ErrInvalidAction;
  }
  string(): string {
    return OrderStatus.Paid;
  }
}

class OrderDelivered extends OrderState implements IOrderState {
  cancel(): Error {
    throw ErrInvalidAction;
  }
  pay(): Error {
    throw ErrInvalidAction;
  }
  deliver(): Error {
    throw ErrInvalidAction;
  }
  finish(): Error {
    this.change(new OrderFinished());
    return null;
  }
  string(): string {
    return OrderStatus.Delivered;
  }
}

class Order {
  state: IOrderState = new OrderCreated(this);

  current(): string {
    return this.state.string();
  }

  cancel() {
    return this.state.cancel();
  }

  pay() {
    return this.state.pay();
  }

  deliver() {
    return this.state.deliver();
  }

  finish() {
    return this.state.finish();
  }
}

interface ITrafficLightState {
  next(change: (state: ITrafficLightState) => void): void;
  view(): void;
}

class TrafficLightGreen implements ITrafficLightState {
  next(change: (state: ITrafficLightState) => void): void {
    change(new TrafficLightYellow());
  }
  view(): void {
    console.log('Traffic light: green on');
  }
}
class TrafficLightYellow implements ITrafficLightState {
  next(change: (state: ITrafficLightState) => void): void {
    change(new TrafficLightRed());
  }
  view(): void {
    console.log('Traffic light: yellow on');
  }
}
class TrafficLightRed implements ITrafficLightState {
  next(change: (state: ITrafficLightState) => void): void {
    change(new TrafficLightGreen());
  }
  view(): void {
    console.log('Traffic light: red on');
  }
}

class TrafficLight {
  protected state: ITrafficLightState = new TrafficLightGreen();

  protected change = (state: ITrafficLightState) => {
    this.state = state;
  };

  next() {
    return this.state.next(this.change);
  }

  view() {
    return this.state.view();
  }
}

(async () => {
  const order = new Order();
  console.log('Order state:', order.current());

  let err: Error;
  // // Invalid action
  // err = order.Finish();
  // if (err) {
  //   console.log('Finish Err:', err.message);
  // }

  // // OK
  err = order.pay();
  if (err) {
    console.log('Pay Err:', err.message);
  }

  // // OK
  err = order.deliver();
  if (err) {
    console.log('Deliver Err:', err.message);
  }

  // // OK
  err = order.finish();
  if (err) {
    console.log('Finish Err:', err.message);
  }

  console.log('');

  const trafficLight = new TrafficLight();
  trafficLight.view();

  trafficLight.next();
  trafficLight.view();

  trafficLight.next();
  trafficLight.view();

  trafficLight.next();
  trafficLight.view();
})();
