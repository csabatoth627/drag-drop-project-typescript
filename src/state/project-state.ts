 import { Project } from "../models/project";
 import { ProjectStatus } from "../models/project";

 // Manage Project State
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProjects(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListener();
    }

    moveProject(projctId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projctId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListener();
      }
    }

    private updateListener() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

 export const projectState = ProjectState.getInstance();
