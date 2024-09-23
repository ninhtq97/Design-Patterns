interface IFile {
  size: number;
}

class FileItem implements IFile {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Folder {
  files: FileItem[];
  children: Folder[];

  constructor(files: FileItem[] = [], children: Folder[] = []) {
    this.files = files;
    this.children = children;
  }

  capacity(): number {
    let cost = this.files.reduce((prev, cur) => prev + cur.size + cur.size, 0);

    for (const child of this.children) {
      cost += child.capacity();
    }

    return cost;
  }
}

class Disk {
  files: FileItem[];
  folders: Folder[];

  constructor(files: FileItem[] = [], folders: Folder[] = []) {
    this.files = files;
    this.folders = folders;
  }

  capacity(): number {
    let capacity = this.files.reduce((prev, cur) => prev + cur.size, 0);

    for (const folder of this.folders) {
      capacity += folder.capacity();
    }

    return capacity;
  }
}

(() => {
  const files = Array(3)
    .fill({})
    .map(
      (_, i) => new FileItem(`File ${i + 1}`, Math.floor(Math.random() * 100)),
    );

  const folders = Array(4)
    .fill({})
    .map(
      () =>
        new Folder(
          Array(2)
            .fill({})
            .map(
              (_, i) =>
                new FileItem(`Item ${i + 1}`, Math.floor(Math.random() * 50)),
            ),

          Array(Math.floor(Math.random() * 2))
            .fill({})
            .map(
              (_, i) =>
                new Folder(
                  Array(Math.floor(Math.random() * 5))
                    .fill({})
                    .map(
                      (_, i) =>
                        new FileItem(
                          `Item ${i + 1}`,
                          Math.floor(Math.random() * 25),
                        ),
                    ),
                ),
            ),
        ),
    );

  const disk = new Disk(files, folders);
  console.log('Disk:', JSON.stringify(disk, undefined, 2));
  console.log('Disk capacity:', disk.capacity());
})();
