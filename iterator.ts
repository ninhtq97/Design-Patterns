interface Follower {
  receive(message: string): void;
}

class Profile implements Follower {
  constructor(public name: string) {}

  receive(message: string): void {
    console.log(`${this.name} has received message: ${message}`);
  }
}

interface FollowerIterator {
  next(): Follower;
  hasNext(): boolean;
}

// sendMessage is used for any FollowerIterator
function sendMessage(iterator: FollowerIterator, msg: string): void {
  while (iterator.hasNext()) {
    iterator.next().receive(msg);
  }
}

// Array Iterator

class FollowerArrayIterator implements FollowerIterator {
  private currentIdx: number = 0;

  constructor(private arr: Follower[]) {}

  hasNext(): boolean {
    return this.arr.length > 0 && this.currentIdx < this.arr.length;
  }

  next(): Follower {
    const flw = this.arr[this.currentIdx];
    this.currentIdx++;
    return flw;
  }
}

// Linked-List Iterator

class LinkedNode {
  constructor(public val: Follower, public next: LinkedNode | null = null) {}
}

class FollowerLinkedListIterator implements FollowerIterator {
  constructor(private node: LinkedNode | null) {}

  hasNext(): boolean {
    return this.node !== null;
  }

  next(): Follower {
    const node = this.node!;
    this.node = node.next;
    return node.val;
  }
}

// Tree Iterator

class TreeNode {
  constructor(public val: Follower, public children: TreeNode[] = []) {}
}

class FollowerTreeStorage {
  constructor(private node: TreeNode | null) {}

  private toArray(node: TreeNode | null): Follower[] {
    if (node === null) {
      return [];
    }

    const followers: Follower[] = [node.val];

    for (const child of node.children) {
      followers.push(...this.toArray(child));
    }

    return followers;
  }

  private toLinkedList(
    node: TreeNode | null,
    lNode: LinkedNode | null,
  ): LinkedNode | null {
    if (node === null) {
      return null;
    }

    lNode = new LinkedNode(node.val, lNode);

    for (const child of node.children) {
      lNode = this.toLinkedList(child, lNode);
    }

    return lNode;
  }

  iterator(): FollowerIterator {
    // return new FollowerArrayIterator(this.toArray(this.node))
    return new FollowerLinkedListIterator(this.toLinkedList(this.node, null));
  }
}

// Sample data & structures

const arrayOfFollowers: Follower[] = [
  new Profile('Peter'),
  new Profile('Mary'),
  new Profile('Tom'),
  new Profile('Henry'),
];

const linkedListOfFollowers = new LinkedNode(
  new Profile('Peter'),
  new LinkedNode(new Profile('Mary'), new LinkedNode(new Profile('Tom'))),
);

const treeOfFollowers = new TreeNode(new Profile('Peter'), [
  new TreeNode(new Profile('Tom'), [
    new TreeNode(new Profile('Mary')),
    new TreeNode(new Profile('Vincent')),
    new TreeNode(new Profile('Vicky')),
  ]),
  new TreeNode(new Profile('Bob'), [new TreeNode(new Profile('Alice'))]),
]);

(() => {
  const message = 'hello';

  console.log('[a, b, c] Array iterator');
  let iterator = new FollowerArrayIterator(arrayOfFollowers);
  sendMessage(iterator, message);

  console.log('a -> b -> c Linked-List iterator');
  let iterator2 = new FollowerLinkedListIterator(linkedListOfFollowers);
  sendMessage(iterator2, message);

  console.log('a -> [b -> [e, f], c] Tree iterator');
  let iterator3 = new FollowerTreeStorage(treeOfFollowers).iterator();
  sendMessage(iterator3, message);
})();
