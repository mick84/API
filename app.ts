import { getStudents, makeRow } from "./functions.js";
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  hobby: string;
  age: number;
  city: string;
  capsule: number;
}
class App {
  #table = document.getElementById("table")!;
  #sortOpts = [
    "id",
    "name",
    "family",
    "capsule",
    "age",
    "city",
    "gender",
    "hobby",
  ];
  #state = {
    sortedBy: {
      field: this.#sortOpts[0],
      ascending: true,
    },
    students: [],
  };
  constructor() {
    window.addEventListener("load", async () => {
      //this.#state.sortedBy = JSON.parse(sessionStorage.getItem("sortedBy")!);
      this.#state.students = await getStudents();
      for (const s of this.#state.students) {
        const row = makeRow(s);
        this.#table.appendChild(row);
      }
    });
    this.#table.addEventListener("click", (e) => {
      const target = e.target as Element;
      switch (true) {
        case target.classList.contains("delete"):
          const row = target.parentElement!;
          const rowIndex = [...this.#table.children].indexOf(row);
          console.log(rowIndex);
          //delete from state:
          this.#state.students.splice(rowIndex - 1, 1);
          sessionStorage.setItem(
            "students",
            JSON.stringify(this.#state.students)
          );
          //delete from UI:
          target.parentElement?.remove();
          break;
        case target.classList.contains("col-head"):
          console.log(target.textContent);

          break;
      }
    });
  }
}

new App();
