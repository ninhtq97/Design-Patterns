interface Observer {
  receiveNotify(job: Job): void;
}

class Job {
  constructor(public title: string) {
    this.title = title;
  }
}

class Developer implements Observer {
  receiveNotify(job: Job): void {
    console.log("Many thanks, I've received job:", job.title);
  }
}

class ITJobsCompany {
  private jobs: Job[] = [];
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  private notifyToObservers(job: Job): void {
    for (const observer of this.observers) {
      observer.receiveNotify(job);
    }
  }

  addNewJob(job: Job): void {
    this.jobs.push(job);
    this.notifyToObservers(job);
  }
}

(() => {
  const itComp = new ITJobsCompany();
  const developer = new Developer();

  // Developer will be added as an observer
  itComp.addObserver(developer);

  // Developer will receive new jobs
  itComp.addNewJob(new Job('Senior Go backend engineer'));
  itComp.addNewJob(new Job('Junior React developer'));

  // Developer no longer receives new job
  itComp.removeObserver(developer);

  itComp.addNewJob(new Job('Some boring IT job'));
})();
