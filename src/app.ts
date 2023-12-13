const AutoBind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleElementIntput: HTMLInputElement;
  descriptionElementIntput: HTMLInputElement;
  numberElementIntput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleElementIntput = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionElementIntput = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.numberElementIntput = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private clearUserInputs() {
    this.titleElementIntput.value = "";
    this.descriptionElementIntput.value = "";
    this.numberElementIntput.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleElementIntput.value;
    const description = this.descriptionElementIntput.value;
    const people = this.numberElementIntput.value;

    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      people.trim().length === 0
    ) {
      alert("Invalid input");
      return;
    } else {
      return [title, description, +people];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearUserInputs()
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const project = new ProjectInput();
